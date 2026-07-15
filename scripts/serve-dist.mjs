#!/usr/bin/env node
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT ?? 4173);
const HOST = process.env.HOST ?? '127.0.0.1';
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function fileFor(pathname) {
  const decoded = decodeURIComponent(pathname);
  const requested = path.resolve(DIST, `.${decoded}`);
  if (!requested.startsWith(`${DIST}${path.sep}`) && requested !== DIST) return null;
  if (path.extname(requested)) return requested;
  return path.join(requested, 'index.html');
}

createServer((request, response) => {
  const pathname = new URL(request.url ?? '/', `http://${request.headers.host}`).pathname;
  const candidate = fileFor(pathname);
  const file = candidate && existsSync(candidate) ? candidate : path.join(DIST, 'index.html');
  response.writeHead(200, { 'content-type': MIME_TYPES[path.extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(PORT, HOST, () => console.log(`serve-dist: http://${HOST}:${PORT}`));
