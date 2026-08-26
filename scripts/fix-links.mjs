import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const astroFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && full.endsWith('.astro')) {
      astroFiles.push(full);
    }
  }
}

walk(root);

const linkRegex = /href="(\/(?:[^"]*)?)"/g;
const expressionLinkRegex = /href=\{(\/(?:[^"}]*)?)\}/g;

let changedFiles = 0;

for (const file of astroFiles) {
  let source = fs.readFileSync(file, 'utf8');
  const original = source;

  const hasLiteralLinks = linkRegex.test(source);
  linkRegex.lastIndex = 0;

  if (hasLiteralLinks) {
    source = source.replace(linkRegex, (_, value) => {
      if (value === '/') {
        return 'href={withBase("/")}';
      }

      if (value.includes('#')) {
        const [pathPart, hash] = value.split('#');
        return `href={\`\${withBase("${pathPart}")}#${hash}\`}`;
      }

      return `href={withBase("${value}")}`;
    });
  }

  source = source.replace(expressionLinkRegex, (_, value) => {
    if (value === '/') {
      return 'href={withBase("/")}';
    }

    return `href={withBase("${value}")}`;
  });

  if (source !== original) {
    if (!source.includes("from '../utils/links'")) {
      source = source.replace(
        /^---\r?\n/,
        `---\nimport { withBase } from '../utils/links';\n`
      );
    }

    fs.writeFileSync(file, source, 'utf8');
    changedFiles++;
  }
}

// Header navigation uses item.href from site.ts.
const headerPath = path.resolve('src/components/Header.astro');

if (fs.existsSync(headerPath)) {
  let header = fs.readFileSync(headerPath, 'utf8');

  header = header.replace(
    'href={item.href}',
    'href={withBase(item.href)}'
  );

  fs.writeFileSync(headerPath, header, 'utf8');
}

// Make the central nav definitions base-independent.
// They remain normal route strings; Header applies withBase().
console.log(`Fixed ${changedFiles} Astro files.`);
console.log('Header navigation updated.');