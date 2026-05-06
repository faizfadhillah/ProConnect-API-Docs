#!/usr/bin/env node
/**
 * extract.js — Enhanced ProConnect API documentation extractor
 *
 * Walks the NestJS source tree and emits a structured JSON document
 * describing every controller / endpoint, including:
 *   - HTTP method + path
 *   - Summary (from @ApiOperation)
 *   - Auth status (@Public)
 *   - Guards applied
 *   - Query parameters (from @ApiQuery or DTO references)
 *   - Request body DTO name
 *   - Response type info
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

// Parse a DTO file for field names and types
function parseDtoFields(dtoPath) {
  if (!fs.existsSync(dtoPath)) return [];
  const text = fs.readFileSync(dtoPath, 'utf8');
  const fields = [];
  const fieldRegex = /(?:@(?:ApiProperty|IsString|IsNumber|IsOptional|IsBoolean|IsEnum|IsArray|IsEmail|IsDate|IsUUID|ValidateNested|Type)\s*\([^)]*\)\s*\n\s*)*(\w+)\s*[?]?\s*:\s*([^;=\n]+)/g;
  let match;
  while ((match = fieldRegex.exec(text)) !== null) {
    const name = match[1];
    let type = match[2].trim();
    // Skip class names, constructors, methods
    if (['constructor', 'class', 'export', 'import', 'return', 'super'].includes(name)) continue;
    // Check if optional
    const isOptional = text.substring(Math.max(0, match.index - 200), match.index).includes('@IsOptional');
    // Clean up the type
    type = type.replace(/\/\/.*$/, '').trim();
    if (type.length > 60) type = type.substring(0, 60) + '…';
    fields.push({ name, type, optional: isOptional });
  }
  return fields;
}

// Find DTO file path from import or convention
function findDtoFile(srcDir, controllerDir, dtoName) {
  // Common patterns: dto/create-X.dto.ts, dto/update-X.dto.ts
  const dtoDir = path.join(controllerDir, 'dto');
  if (fs.existsSync(dtoDir)) {
    const files = fs.readdirSync(dtoDir);
    for (const f of files) {
      if (f.endsWith('.dto.ts')) {
        const content = fs.readFileSync(path.join(dtoDir, f), 'utf8');
        if (content.includes(`class ${dtoName}`)) {
          return path.join(dtoDir, f);
        }
      }
    }
  }
  return null;
}

const result = [];

for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const controllerDir = path.dirname(file);

  let basePath = '';
  let tag = '';
  const controllerGuards = [];

  for (let i = 0; i < lines.length; i++) {
    const m1 = lines[i].match(/@Controller\(\s*['"`]([^'"`]*)['"`]/);
    if (m1 && !basePath) basePath = m1[1];
    const m2 = lines[i].match(/@ApiTags\(\s*['"`]([^'"`]*)['"`]/);
    if (m2 && !tag) tag = m2[1];
    // Collect controller-level guards
    const gm = lines[i].match(/@UseGuards\(([^)]+)\)/);
    if (gm && !lines.slice(i + 1, i + 5).some(l => /^\s*@(Get|Post|Put|Patch|Delete)/.test(l))) {
      controllerGuards.push(...gm[1].split(',').map(g => g.trim()));
    }
    if (lines[i].includes('export class')) break;
  }

  const endpoints = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/@(Get|Post|Put|Patch|Delete)\(\s*(?:['"`]([^'"`]*)['"`])?\s*\)/);
    if (!m) continue;

    const method = m[1].toUpperCase();
    const sub = m[2] || '';

    let isPublic = false;
    const guards = [...controllerGuards];
    let summary = '';
    let bodyDto = '';
    const queryParams = [];

    // Look backward for decorators on this endpoint
    for (let j = Math.max(0, i - 12); j < i; j++) {
      if (lines[j].includes('@Public(')) isPublic = true;
      const gm = lines[j].match(/@UseGuards\(([^)]+)\)/);
      if (gm) guards.push(...gm[1].split(',').map(g => g.trim()));
      const qm = lines[j].match(/@ApiQuery\(\s*\{[^}]*name\s*:\s*['"`]([^'"`]+)['"`]/);
      if (qm) queryParams.push(qm[1]);
    }

    // Look forward for summary and body info
    for (let j = i + 1; j < Math.min(lines.length, i + 25); j++) {
      const sm = lines[j].match(/summary\s*:\s*['"`]([^'"`]*)['"`]/);
      if (sm && !summary) { summary = sm[1]; }

      // Detect @Body() param with DTO
      const bm = lines[j].match(/@Body\(\)\s+\w+\s*:\s*(\w+)/);
      if (bm) bodyDto = bm[1];

      // Detect @Query() param
      const qdm = lines[j].match(/@Query\(\s*['"`](\w+)['"`]\s*\)/);
      if (qdm) queryParams.push(qdm[1]);

      if (/^\s*\}/.test(lines[j]) && j > i + 3) break;
      if (/^\s*@(Get|Post|Put|Patch|Delete)/.test(lines[j])) break;
    }

    const fullPath = '/' + [basePath, sub].filter(Boolean).join('/').replace(/\/+/g, '/');

    const ep = { method, path: fullPath, summary, isPublic };

    // Add optional enriched fields
    if (guards.length) {
      ep.guards = [...new Set(guards.filter(g => g && !g.includes('AuthGuard')))];
      if (!ep.guards.length) delete ep.guards;
    }
    if (bodyDto) {
      ep.requestBody = bodyDto;
      // Try to parse DTO fields
      const dtoFile = findDtoFile(SRC, controllerDir, bodyDto);
      if (dtoFile) {
        const fields = parseDtoFields(dtoFile);
        if (fields.length) ep.bodyFields = fields;
      }
    }
    if (queryParams.length) ep.queryParams = [...new Set(queryParams)];

    endpoints.push(ep);
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
