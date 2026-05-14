import sharp from 'sharp';
import fs from 'fs';

const svg = fs.readFileSync('public/favicon.svg', 'utf8');

const outputs = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/apple-touch-icon.png', 180],
  ['public/favicon-192x192.png', 192],
  ['public/favicon-512x512.png', 512],
];

for (const [file, size] of outputs) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(file);
}

console.log('Favicon PNGs generated.');
