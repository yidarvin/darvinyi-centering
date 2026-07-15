#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SERVER_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const PUBLIC_DIR = path.join(ROOT, 'public');
const { bibliographyData } = await import(pathToFileURL(SERVER_ENTRY).href);

mkdirSync(PUBLIC_DIR, { recursive: true });
const entries = bibliographyData();
writeFileSync(path.join(PUBLIC_DIR, 'bibliography.json'), `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
console.log(`build-bibliography: wrote ${entries.length} structured entries to public/bibliography.json`);
