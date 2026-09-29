import fs from 'node:fs/promises';
import path from 'node:path';

const profilePath = path.join(process.cwd(), 'public/data/profile.json');
const profile = JSON.parse(await fs.readFile(profilePath, 'utf8'));
const github = profile.github;

if (!github?.username) {
  throw new Error('profile.github.username is required to sync GitHub projects.');
}

const requestHeaders = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) {
  requestHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const response = await fetch(
  `https://api.github.com/users/${github.username}/repos?sort=pushed&per_page=100&type=owner`,
  { headers: requestHeaders }
);

if (!response.ok) {
  throw new Error(`GitHub API request failed: HTTP ${response.status}`);
}

const repositories = await response.json();
const excluded = new Set(github.exclude ?? []);
const projects = repositories
  .filter((repository) => !repository.fork && !repository.archived && !excluded.has(repository.name))
  .sort((left, right) => new Date(right.pushed_at) - new Date(left.pushed_at))
  .slice(0, github.maxItems ?? 9)
  .map((repository) => ({
    title: repository.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase()),
    description: repository.description || 'Repository publik di GitHub.',
    image: `https://opengraph.githubassets.com/${encodeURIComponent(repository.name)}/${encodeURIComponent(github.username)}/${encodeURIComponent(repository.name)}`,
    tags: [...(repository.topics ?? []), ...(repository.language ? [repository.language] : [])].slice(0, 4),
    url: repository.homepage || repository.html_url,
    id: repository.name,
  }));

const manualProjects = (profile.projects ?? []).filter((project) => !projects.some((synced) => synced.id === project.id));
profile.projects = [...manualProjects, ...projects];
await fs.writeFile(profilePath, `${JSON.stringify(profile, null, 2)}\n`);

console.log(`GitHub portfolio synced: ${projects.length} repositories`);
