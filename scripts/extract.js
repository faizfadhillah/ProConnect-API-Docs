#!/usr/bin/env node
/**
 * extract.js
 *
 * Walks a NestJS source tree (i.e. the upstream ProConnect-API repo) and emits
 * a flat JSON document describing every controller / endpoint discovered.
 *
 * Usage:
 *   node scripts/extract.js path/to/proconnect-api > assets/endpoints.json
 */

'use strict';

const fs = require('fs');
const path = require('path');

const root = process.argv[2];
if (!root) {
  console.error('Usage: node scripts/extract.js <path-to-proconnect-api>');
  process.exit(1);
}

const SRC = path.join(root, 'src');
if (!fs.existsSync(SRC)) {
  console.error(`Source directory not found: ${SRC}`);
  process.exit(1);
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (full.endsWith('.controller.ts')) files.push(full);
  }
  return files;
}

const result = [];

for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');

  let basePath = '';
  let tag = '';
  for (let i = 0; i < lines.length; i++) {
    const m1 = lines[i].match(/@Controller\(\s*['"`]([^'"`]*)['"`]/);
    if (m1 && !basePath) basePath = m1[1];
    const m2 = lines[i].match(/@ApiTags\(\s*['"`]([^'"`]*)['"`]/);
    if (m2 && !tag) tag = m2[1];
    if (lines[i].includes('export class')) break;
  }

  const endpoints = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/@(Get|Post|Put|Patch|Delete)\(\s*(?:['"`]([^'"`]*)['"`])?\s*\)/);
    if (!m) continue;

    const method = m[1].toUpperCase();
    const sub = m[2] || '';

    let isPublic = false;
    for (let j = Math.max(0, i - 6); j < i; j++) {
      if (lines[j].includes('@Public(')) isPublic = true;
    }

    let summary = '';
    for (let j = i + 1; j < Math.min(lines.length, i + 25); j++) {
      const sm = lines[j].match(/summary\s*:\s*['"`]([^'"`]*)['"`]/);
      if (sm) { summary = sm[1]; break; }
      if (/^\s*async\s+|^\s*[a-zA-Z_]+\(/.test(lines[j])) break;
    }

    const fullPath = '/' + [basePath, sub].filter(Boolean).join('/').replace(/\/+/g, '/');
    endpoints.push({ method, path: fullPath, summary, isPublic });
  }

  if (!endpoints.length) continue;

  result.push({
    file: path.relative(root, file),
    tag: tag || basePath || 'misc',
    basePath: '/' + basePath,
    endpoints,
  });
}

process.stdout.write(JSON.stringify(result, null, 2) + '\n');
