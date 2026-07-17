import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const assetsDir = join(process.cwd(), 'dist', 'assets');

// Raw bytes are stable enough to catch a real regression while keeping this
// dependency-free. These route chunks are intentionally lazy: the landing page
// does not pay for search's index or the convergence graph's rendering engine.
//
// These limits are regression ratchets, not size goals: they are set a little
// above the current measured size so a real regression fails the build, not a
// target to grow toward. Lower a limit whenever a change shrinks its chunk.
const budgets = [
  { label: 'shared application', pattern: /^index-[\w-]+\.js$/, limit: 230_000 },
  { label: 'search', pattern: /^Search-[\w-]+\.js$/, limit: 425_000 },
  { label: 'sources', pattern: /^Bibliography-[\w-]+\.js$/, limit: 10_000 },
  { label: 'convergence graph chapter', pattern: /^one-calm-many-doors-[\w-]+\.js$/, limit: 60_000 },
  { label: 'cytoscape engine', pattern: /^cytoscape\.esm-[\w-]+\.js$/, limit: 460_000 },
];

const assets = await readdir(assetsDir);
let failed = false;

for (const budget of budgets) {
  const file = assets.find((name) => budget.pattern.test(name));
  if (!file) throw new Error(`Bundle budget could not find the ${budget.label} chunk.`);

  const bytes = (await stat(join(assetsDir, file))).size;
  const verdict = bytes <= budget.limit ? 'ok' : 'over';
  console.log(`${verdict}: ${budget.label} ${(bytes / 1000).toFixed(2)} kB / ${(budget.limit / 1000).toFixed(0)} kB`);
  if (bytes > budget.limit) failed = true;
}

if (failed) process.exitCode = 1;
