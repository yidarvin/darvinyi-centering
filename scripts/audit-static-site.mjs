import { access, readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const chapters = join(root, 'src', 'content', 'chapters');

async function filesUnder(dir, predicate) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const file = join(dir, entry.name);
      return entry.isDirectory() ? filesUnder(file, predicate) : predicate(file) ? [file] : [];
    }),
  );
  return nested.flat();
}

function pathnameFor(file) {
  const rel = relative(dist, file).replace(/\\/g, '/');
  return rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '')}`;
}

function anchorsIn(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
}

function localHref(href) {
  return href.startsWith('/') || href.startsWith('#');
}

const pages = await filesUnder(dist, (file) => file.endsWith('.html'));
const pageByPath = new Map(await Promise.all(pages.map(async (file) => [pathnameFor(file), await readFile(file, 'utf8')])));
const errors = [];

for (const [pathname, html] of pageByPath) {
  for (const required of ['<title>', 'name="description"', 'rel="canonical"', 'property="og:url"', 'id="main"']) {
    if (!html.includes(required)) errors.push(`${pathname}: missing ${required}`);
  }

  for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (!localHref(href)) continue;

    const [route, hash] = href.split('#');
    if (route && (route.startsWith('/assets/') || route.includes('.'))) {
      try {
        await access(join(dist, route.slice(1)));
      } catch {
        errors.push(`${pathname}: local asset ${href} is missing`);
      }
      continue;
    }
    const destination = route || pathname;
    const target = pageByPath.get(destination);
    if (!target) {
      errors.push(`${pathname}: local link ${href} has no generated destination`);
      continue;
    }
    if (hash && !anchorsIn(target).has(hash)) errors.push(`${pathname}: anchor ${href} is missing`);
  }
}

const proseFiles = await filesUnder(chapters, (file) => file.endsWith('.mdx'));
for (const file of proseFiles) {
  if ((await readFile(file, 'utf8')).includes('—')) errors.push(`${relative(root, file)}: reader-facing em dash found`);
}

if (errors.length) {
  console.error(`static audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`static audit: ${pageByPath.size} pages, local links and anchors valid, metadata present, prose has no em dashes`);
