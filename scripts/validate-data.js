import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'public', 'data', 'profile.json');
const profile = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const errors = [];
const requiredFields = ['name', 'title', 'summary', 'location', 'photo', 'contact.email'];

function checkPath(source, fieldPath) {
  const value = fieldPath.split('.').reduce((current, key) => current?.[key], source);
  if (!value) errors.push(`Missing required field: ${fieldPath}`);
}

requiredFields.forEach((fieldPath) => checkPath(profile, fieldPath));

['training', 'experience', 'education', 'languages'].forEach((key) => {
  (profile[key] ?? []).forEach((item, index) => {
    if (!item.id) errors.push(`${key}[${index}] is missing id`);
  });
});

['expertise', 'training', 'experience', 'education', 'certifications', 'languages', 'projects'].forEach((key) => {
  if (!Array.isArray(profile[key])) errors.push(`${key} must be an array`);
});

if (Array.isArray(profile.projects)) {
  const ids = profile.projects.filter((project) => project.id).map((project) => project.id);
  if (new Set(ids).size !== ids.length) errors.push('projects contains duplicate ids');
}

if (profile.photo) {
  const photoPath = path.join(__dirname, '..', 'public', profile.photo.replace(/^\//, ''));
  if (!fs.existsSync(photoPath)) errors.push(`Profile photo not found: ${profile.photo}`);
}

if (profile.github?.username) {
  if (!/^[A-Za-z\d](?:[A-Za-z\d]|-(?=[A-Za-z\d])){0,38}$/.test(profile.github.username)) {
    errors.push('profile.github.username is invalid');
  }
  if (profile.github.exclude && !Array.isArray(profile.github.exclude)) {
    errors.push('profile.github.exclude must be an array');
  }
}

for (const language of ['id', 'en']) {
  const translations = profile.translations?.[language];
  if (!translations) {
    errors.push(`Missing translations for ${language}`);
    continue;
  }
  ['summary', 'status', 'cta', 'training', 'experience', 'education', 'languages', 'ui', 'meta'].forEach((key) => {
    if (!translations[key]) errors.push(`Missing translations.${language}.${key}`);
  });
  ['training', 'experience', 'education', 'languages'].forEach((key) => {
    (profile[key] ?? []).forEach((item) => {
      if (item.id && !translations[key]?.[item.id]) {
        errors.push(`Missing translations.${language}.${key}.${item.id}`);
      }
    });
  });
}

if (errors.length) {
  errors.forEach((error) => console.error(error));
  process.exit(1);
}

console.log('Profile schema and translation integrity: valid');
