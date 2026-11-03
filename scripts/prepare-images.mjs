// Usage: node scripts/prepare-images.mjs raw-images
// Resizes downloaded photos, applies EXIF rotation, strips metadata (GPS etc.)
// and writes them to src/assets/images/<section>/<name>.jpg.
// Also copies photo credits to src/data/credits.json.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = path.resolve(process.argv[2] ?? 'raw-images');
const out = path.resolve('src/assets/images');
const MAX = { hero: 2560 };

for (const section of fs.readdirSync(src)) {
  const dir = path.join(src, section);
  if (!fs.statSync(dir).isDirectory()) continue;
  fs.mkdirSync(path.join(out, section), { recursive: true });
  for (const file of fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
    const target = path.join(out, section, file.replace(/\.\w+$/, '.jpg'));
    const info = await sharp(path.join(dir, file))
      .rotate()
      .resize({ width: MAX[section] ?? 1920, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(target);
    console.log(`${section}/${file}`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
  }
}

const creditsFile = path.join(src, 'credits.json');
if (fs.existsSync(creditsFile)) {
  const credits = JSON.parse(fs.readFileSync(creditsFile, 'utf8')).map((c) => ({
    ...c,
    author: c.author
      .replace(/^Original uploader was (\S+) at .*$/, '$1')
      .replace(/ \/ Thank you for .*$/, '')
      .replace(/ from [A-Z][\w ]+, [A-Z][\w ]+$/, '')
      .trim(),
  }));
  fs.writeFileSync('src/data/credits.json', JSON.stringify(credits, null, 2) + '\n');
  console.log('credits:', credits.length);
}
