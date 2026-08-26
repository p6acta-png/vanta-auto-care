// Reparerer tegnkorrupsjon: UTF-8 bytes lest som CP1251 (russisk ANSI).
// Fremgangsmåte: tekst → CP1251-bytes → UTF-8-dekoding gir originalteksten.
import { readFileSync, writeFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Bruk: node scripts/repair-encoding.mjs <fil> [fil...]');
  process.exit(1);
}

const dec = new TextDecoder('windows-1251');
const map = new Map();
for (let b = 0; b < 256; b++) {
  const ch = dec.decode(Uint8Array.of(b));
  if (!map.has(ch)) map.set(ch, b);
}

const toCp1251 = (s) => {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const b = map.get(ch);
    out[i] = b === undefined ? ch.charCodeAt(0) : b;
  }
  return out;
};

for (const f of files) {
  const corrupted = readFileSync(f, 'utf8');
  const fixed = new TextDecoder('utf-8').decode(toCp1251(corrupted));
  writeFileSync(f, fixed, 'utf8');
  console.log('reparert', f);
}
