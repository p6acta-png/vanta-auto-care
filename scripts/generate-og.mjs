// Genererer public/og-image.jpg fra hero-bildet.
// Kjøres med: pnpm og
import sharp from 'sharp';

const src = 'src/assets/img/hero.jpg';
const out = 'public/og-image.jpg';

const overlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1e1c18" stop-opacity="0.15"/>
      <stop offset="0.55" stop-color="#1e1c18" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#1e1c18" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="72" y="236" width="10" height="10" fill="#a05a26"/>
  <text x="96" y="248" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="9" fill="#cf8a52">VANTA AUTO CARE</text>
  <text x="72" y="348" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="800" fill="#f4f1ea">Detaljert arbeid.</text>
  <text x="72" y="432" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="800" fill="#f4f1ea">Synlig forskjell.</text>
  <text x="72" y="516" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="400" fill="#d8d2c5">Bilpleie · Polering · Keramisk coating · PPF — Oslo</text>
</svg>`;

await sharp(src)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);

console.log('Skrev', out);
