import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const resourcesFile = join(root, 'src', 'components', 'chapters', 'calm-is-not-numbness', 'resources.ts');

const WARN_AFTER_DAYS = 30;
const FAIL_AFTER_DAYS = 90;

const source = await readFile(resourcesFile, 'utf8');
const match = source.match(/export const RESOURCES_VERIFIED_AT = '(\d{4}-\d{2}-\d{2})';/);

if (!match) {
  console.error(`check-resource-freshness: could not find RESOURCES_VERIFIED_AT in ${resourcesFile}`);
  process.exit(1);
}

const verifiedAt = new Date(`${match[1]}T00:00:00Z`);
const ageInDays = Math.floor((Date.now() - verifiedAt.getTime()) / (24 * 60 * 60 * 1000));

if (ageInDays >= FAIL_AFTER_DAYS) {
  console.error(
    `check-resource-freshness: crisis resources were last verified ${ageInDays} days ago (${match[1]}), past the ` +
      `${FAIL_AFTER_DAYS}-day limit. Re-verify every number in resources.ts against its official source, then bump ` +
      `RESOURCES_VERIFIED_AT.`,
  );
  process.exit(1);
}

if (ageInDays >= WARN_AFTER_DAYS) {
  console.warn(
    `check-resource-freshness: crisis resources were last verified ${ageInDays} days ago (${match[1]}). Re-verify ` +
      `soon, this fails the build at ${FAIL_AFTER_DAYS} days.`,
  );
} else {
  console.log(`check-resource-freshness: ok, crisis resources verified ${ageInDays} day(s) ago (${match[1]})`);
}
