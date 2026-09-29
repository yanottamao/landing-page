import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const sourcePath = path.join(process.cwd(), 'public/assets/img/yanottama.jpeg');
const outputDirectory = path.dirname(sourcePath);
const baseName = path.basename(sourcePath, '.jpeg');
const source = await fs.readFile(sourcePath);
const cacheKey = createHash('sha256').update(source).digest('hex').slice(0, 12);

async function storeImage(input) {
  const sharp = (await import('sharp')).default;
  const output = await sharp(input.source)
    .resize({ width: input.width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
  const outputPath = path.join(outputDirectory, `${baseName}-${input.width}-${cacheKey}.webp`);
  await fs.writeFile(outputPath, output);
  return { path: outputPath, width: input.width };
}

const variants = [
  { width: 384 },
  { width: 768 },
  { width: 1200 },
];

const results = [];
for (const variant of variants) {
  results.push(await storeImage({ ...variant, source }));
}

if (!results.length) {
  throw new Error('No profile image variants were generated.');
}
