#!/usr/bin/env node

/**
 * ProConnect API Docs Generator
 * Fetches OpenAPI spec and generates Docusaurus markdown docs.
 *
 * Usage:
 *   npm run generate-docs                 # fetch from live API
 *   npm run generate-docs -- --local FILE # use a local JSON file
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_URL = 'https://api.proconnectcareer.com/api-json';
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// ============================================================
// Tag → file mapping
// ============================================================
const TAG_MAP = {
  // User Management
  'users':                { dir: 'user-management', file: 'users',              title: 'Users',                 desc: 'Manage user accounts and profiles on the ProConnect platform. Users represent individual professionals who can create profiles, upload documents, apply for jobs, and connect with companies.' },
  'user-files':           { dir: 'user-management', file: 'user-files',         title: 'User Files',            desc: 'Manage files and documents uploaded by users including resumes, portfolios, and other attachments.' },
  'user-certificates':    { dir: 'user-management', file: 'user-certificates',  title: 'User Certificates',     desc: 'Manage professional certificates and certifications associated with user profiles.' },
  'user-educations':      { dir: 'user-management', file: 'user-educations',    title: 'User Educations',       desc: 'Manage education records including schools, degrees, majors, and graduation details for user profiles.' },
  'user-languages':       { dir: 'user-management', file: 'user-languages',     title: 'User Languages',        desc: 'Manage language proficiency records for user profiles.' },
  'user-professions':     { dir: 'user-management', file: 'user-professions',   title: 'User Professions',      desc: 'Manage professional designations and occupation records for user profiles.' },
  'user-right-to-works':  { dir: 'user-management', file: 'user-right-to-works',title: 'User Right to Work',    desc: 'Manage right-to-work authorizations and work permits for users across different countries.' },
  'user-skills':          { dir: 'user-management', file: 'user-skills',        title: 'User Skills',           desc: 'Manage skills associated with user profiles, enabling skill-based job matching.' },
  'user-career-history':  { dir: 'user-management', file: 'user-career-history',title: 'User Career History',   desc: 'Manage career history and work experience records for user profiles.' },
  'user-skill-passports': { dir: 'user-management', file: 'user-skill-passports',title:'User Skill Passports',  desc: 'Manage user skill passports — verified skill portfolios for professional credentialing.' },
  'user-subscription':    { dir: 'user-management', file: 'user-subscription',  title: 'User Subscription',     desc: 'Manage user subscription plans, billing, and premium feature access.' },
  'user-salary-country':  { dir: 'user-management', file: 'user-salary-country',title: 'User Salary Country',   desc: 'Manage user salary expectations and country-specific salary preferences.' },
  'user-interests':       { dir: 'user-management', file: 'user-interests',     title: 'User Interests',        desc: 'Manage user interest tags for content and job recommendations.' },
  'encrypted-user-data':  { dir: 'user-management', file: 'encrypted-user-data',title: 'Encrypted User Data',   desc: 'Access and manage encrypted sensitive user data such as identity documents and personal identifiers.' },
  'User Accounts':        { dir: 'user-management', file: 'user-accounts',      title: 'User Accounts',         desc: 'Manage user account linking and multi-account configurations.' },
  'User Role Assignments':{ dir: 'user-management', file: 'user-role-assignments',title:'User Role Assignments', desc: 'Manage role assignments for users within the RBAC permission system.' },

  // Job Management
  'jobs':                 { dir: 'job-management',  file: 'jobs',               title: 'Jobs',                  desc: 'Manage job postings including creation, updates, search, and lifecycle management. Jobs are the core entity connecting companies with candidates.' },
  'job-steps':            { dir: 'job-management',  file: 'job-steps',          title: 'Job Steps',             desc: 'Manage hiring pipeline steps for job postings. Job steps define the stages candidates go through during the application process.' },
  'applicants':           { dir: 'job-management',  file: 'applicants',         title: 'Applicants',            desc: 'Manage job applicants, their applications, and tracking through the hiring pipeline.' },
  'applicant-steps':      { dir: 'job-management',  file: 'applicant-steps',    title: 'Applicant Steps',       desc: 'Manage individual applicant progress through hiring pipeline steps.' },
  'applicant-legal-files':{ dir: 'job-management',  file: 'applicant-legal-files',title:'Applicant Legal Files', desc: 'Manage legal documents and files submitted by applicants during the hiring process.' },
  'applicant-job-steps':  { dir: 'job-management',  file: 'applicant-job-steps',title: 'Applicant Job Steps',   desc: 'Manage the relationship between applicants and job pipeline steps, tracking status through each stage.' },
  'skill-match':          { dir: 'job-management',  file: 'skill-match',        title: 'Skill Match',           desc: 'Match user skills against job requirements to provide compatibility scores and recommendations.' },

  // Company Management
  'mst-companies':        { dir: 'company-management', file: 'companies',       title: 'Companies',             desc: 'Manage company profiles, settings, and organizational data. Companies can post jobs, manage employees, and build their employer brand.' },
  'company-files':        { dir: 'company-management', file: 'company-files',   title: 'Company Files',         desc: 'Manage files and documents associated with company profiles, such as logos, banners, and corporate documents.' },
  'mst-departments':      { dir: 'company-management', file: 'departments',     title: 'Departments',           desc: 'Manage department records within companies for organizational structure.' },
  'mst-industries':       { dir: 'company-management', file: 'industries',      title: 'Industries',            desc: 'Manage industry classifications for company categorization.' },
  'follow-user-to-companies':{ dir: 'company-management', file: 'follow-user-to-companies', title: 'Follow Companies', desc: 'Manage user-to-company follow relationships for updates and notifications.' },
  'public-mst-companies': { dir: 'company-management', file: 'public-companies',title: 'Public Companies',      desc: 'Access public company profiles without authentication for discovery and SEO.' },

  // Social & Communication
  'posts':                { dir: 'social-communication', file: 'posts',         title: 'Posts',                 desc: 'Manage social posts for the ProConnect feed, including creation, updates, and engagement.' },
  'events':               { dir: 'social-communication', file: 'events',        title: 'Events',                desc: 'Manage professional events, workshops, and networking opportunities.' },
  'event-pakets':         { dir: 'social-communication', file: 'event-pakets',  title: 'Event Packages',        desc: 'Manage ticket packages and pricing tiers for professional events.' },
  'groups':               { dir: 'social-communication', file: 'groups',        title: 'Groups',                desc: 'Manage professional groups and communities for networking and discussion.' },
  'group-members':        { dir: 'social-communication', file: 'group-members', title: 'Group Members',         desc: 'Manage group membership, roles, and member administration.' },
  'follow-user-to-user':  { dir: 'social-communication', file: 'follow-user-to-user', title: 'Follow Users',   desc: 'Manage user-to-user follow relationships for social networking.' },
  'feedbacks':            { dir: 'social-communication', file: 'feedbacks',     title: 'Feedbacks',             desc: 'Manage feedback submissions and reviews between users and companies.' },
  'firebase':             { dir: 'social-communication', file: 'notifications', title: 'Notifications',         desc: 'Manage push notifications via Firebase Cloud Messaging for real-time alerts.' },

  // Master Data
  'mst-schools':          { dir: 'master-data', file: 'schools',               title: 'Schools',               desc: 'Manage the master list of educational institutions for user education records.' },
  'mst-school-majors':    { dir: 'master-data', file: 'school-majors',         title: 'School Majors',         desc: 'Manage major/program offerings linked to specific schools.' },
  'mst-majors':           { dir: 'master-data', file: 'majors',               title: 'Majors',                desc: 'Manage the master list of academic majors and fields of study.' },
  'mst-languages':        { dir: 'master-data', file: 'languages',            title: 'Languages',             desc: 'Manage the master list of languages for user proficiency records.' },
  'mst-professions':      { dir: 'master-data', file: 'professions',          title: 'Professions',           desc: 'Manage the master list of professions and occupational categories.' },
  'mst-skills':           { dir: 'master-data', file: 'skills',               title: 'Skills',                desc: 'Manage the master list of professional skills for matching and filtering.' },
  'mst-licenses':         { dir: 'master-data', file: 'licenses',             title: 'Licenses',              desc: 'Manage the master list of professional licenses and certifications.' },
  'mst-regions':          { dir: 'master-data', file: 'regions',              title: 'Regions',               desc: 'Manage geographic regions for location-based features and job matching.' },
  'mst-right-to-works':   { dir: 'master-data', file: 'right-to-works',       title: 'Right to Works',        desc: 'Manage the master list of right-to-work authorization types.' },
  'mst-subscription':     { dir: 'master-data', file: 'subscription-plans',   title: 'Subscription Plans',    desc: 'Manage available subscription plan tiers and pricing.' },
  'mst-tags':             { dir: 'master-data', file: 'tags',                 title: 'Tags',                  desc: 'Manage taxonomy tags for content classification and filtering.' },
  'mst-interests':        { dir: 'master-data', file: 'interests',            title: 'Interests',             desc: 'Manage the master list of interest categories for personalization.' },
  'mst-salary-country':   { dir: 'master-data', file: 'salary-countries',     title: 'Salary Countries',      desc: 'Manage country-specific salary benchmark data.' },
  'mst-country':          { dir: 'master-data', file: 'countries',            title: 'Countries',             desc: 'Manage the master list of countries for location references.' },

  // Data Mappings
  'mst-education-license-mappings':    { dir: 'data-mappings', file: 'education-license-mappings',    title: 'Education-License Mappings',    desc: 'Manage mappings between educational qualifications and professional licenses.' },
  'mst-education-profession-mappings': { dir: 'data-mappings', file: 'education-profession-mappings', title: 'Education-Profession Mappings', desc: 'Manage mappings between educational backgrounds and profession categories.' },
  'mst-license-skill-mappings':        { dir: 'data-mappings', file: 'license-skill-mappings',        title: 'License-Skill Mappings',        desc: 'Manage mappings between professional licenses and associated skills.' },
  'mst-informal-certificate-mappings': { dir: 'data-mappings', file: 'informal-certificate-mappings', title: 'Informal Certificate Mappings', desc: 'Manage mappings for informal certificates, workshops, and non-accredited training programs.' },
  'pending-student-verifications':     { dir: 'data-mappings', file: 'pending-student-verifications', title: 'Pending Student Verifications', desc: 'Manage student verification requests awaiting approval for educational credential validation.' },

  // System & Admin
  'rbac':                 { dir: 'system-admin', file: 'rbac',                 title: 'RBAC / Permissions',    desc: 'Manage role-based access control, permissions, and authorization rules.' },
  'configs':              { dir: 'system-admin', file: 'configs',              title: 'Configs',               desc: 'Manage system configuration settings and feature flags.' },
  'media':                { dir: 'system-admin', file: 'media',                title: 'Media',                 desc: 'Manage media file uploads, storage, and retrieval.' },
  'fields':               { dir: 'system-admin', file: 'fields',               title: 'Fields',                desc: 'Manage dynamic form fields and field configurations.' },
  'questionnaires':       { dir: 'system-admin', file: 'questionnaires',       title: 'Questionnaires',        desc: 'Manage questionnaire templates for assessments and surveys.' },
  'questionnaire-answers':{ dir: 'system-admin', file: 'questionnaire-answers',title: 'Questionnaire Answers', desc: 'Manage submitted questionnaire responses and answer data.' },
  'invoices':             { dir: 'system-admin', file: 'invoices',             title: 'Invoices',              desc: 'Manage invoices for subscription billing and service payments.' },
  'invoices-items':       { dir: 'system-admin', file: 'invoice-items',        title: 'Invoice Items',         desc: 'Manage individual line items within invoices.' },
  'bulk-upload':          { dir: 'system-admin', file: 'bulk-upload',          title: 'Bulk Upload',           desc: 'Bulk upload data records for mass data import operations.' },
  'data-migration':       { dir: 'system-admin', file: 'data-migration',       title: 'Data Migration',        desc: 'Tools for migrating data between systems and environments.' },
  'Email Queue Monitoring':{ dir: 'system-admin', file: 'email-queue-monitoring',title:'Email Queue Monitoring',desc: 'Monitor and manage the email sending queue for system notifications.' },
};

// ============================================================
// Helpers
// ============================================================

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function methodBadge(method) {
  const m = method.toUpperCase();
  return `<span class="method-badge method-${m.toLowerCase()}">${m}</span>`;
}

function escPipe(s) {
  if (!s) return '';
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function renderType(prop) {
  if (!prop) return 'any';
  if (prop.enum) return `\`${prop.type}\` enum: ${prop.enum.map(e => `\`${e}\``).join(', ')}`;
  if (prop.type === 'array' && prop.items) return `${prop.items.type || 'object'}[]`;
  return prop.type || 'object';
}

function renderPropsTable(properties, required = []) {
  if (!properties || Object.keys(properties).length === 0) return '';
  let md = '| Name | Type | Required | Description |\n';
  md += '|------|------|----------|-------------|\n';
  for (const [name, prop] of Object.entries(properties)) {
    const isReq = required.includes(name);
    const reqStr = isReq ? '**Yes**' : 'No';
    const typeStr = escPipe(renderType(prop));
    const descStr = escPipe(prop.description || '—');
    md += `| \`${name}\` | ${typeStr} | ${reqStr} | ${descStr} |\n`;
  }
  return md;
}

function renderResponseExample(resolved) {
  if (!resolved || !resolved.properties) return null;
  const obj = {};
  for (const [key, prop] of Object.entries(resolved.properties)) {
    if (prop.type === 'string') obj[key] = prop.enum ? prop.enum[0] : (prop.description ? `<${key}>` : 'string');
    else if (prop.type === 'number' || prop.type === 'integer') obj[key] = 0;
    else if (prop.type === 'boolean') obj[key] = true;
    else if (prop.type === 'array') obj[key] = [];
    else obj[key] = {};
  }
  return obj;
}

function buildCurlExample(method, fullPath, hasBody, bodyExample) {
  let curl = `curl -X ${method.toUpperCase()} "${fullPath}"`;
  curl += ` \\\n  -H "Authorization: Bearer <token>"`;
  curl += ` \\\n  -H "Content-Type: application/json"`;
  if (hasBody && bodyExample) {
    curl += ` \\\n  -d '${JSON.stringify(bodyExample, null, 2).split('\n').join('\n  ')}'`;
  }
  return curl;
}

// ============================================================
// Doc generation
// ============================================================

function generateEndpointSection(ep, index) {
  const BASE = 'https://api.proconnectcareer.com';
  const method = ep.method.toUpperCase();
  let md = '';

  md += `### ${methodBadge(method)} \`${ep.path}\`\n\n`;
  md += `**${ep.summary || ep.operationId || 'No summary'}**\n\n`;
  if (ep.description) md += `${ep.description}\n\n`;

  // Auth
  md += `**Authentication:** Required (Bearer Token)\n\n`;

  // Parameters
  if (ep.parameters && ep.parameters.length > 0) {
    md += `#### Parameters\n\n`;
    md += '| Name | In | Type | Required | Description |\n';
    md += '|------|-----|------|----------|-------------|\n';
    for (const p of ep.parameters) {
      md += `| \`${p.name}\` | ${p.in || 'query'} | ${escPipe(p.schema ? renderType(p.schema) : (p.type || 'string'))} | ${p.required ? '**Yes**' : 'No'} | ${escPipe(p.description || '—')} |\n`;
    }
    md += '\n';
  }

  // Request Body
  if (ep.requestBody) {
    const contentType = Object.keys(ep.requestBody)[0];
    const body = ep.requestBody[contentType];
    if (body && body.resolved && body.resolved.properties) {
      md += `#### Request Body\n\n`;
      md += `Content-Type: \`${contentType}\`\n\n`;
      md += renderPropsTable(body.resolved.properties, body.resolved.required || []);
      md += '\n';
    }
  }

  // Responses
  md += `#### Responses\n\n`;
  for (const [code, resp] of Object.entries(ep.responses || {})) {
    md += `**${code}** — ${resp.description || 'Success'}\n\n`;
    if (resp.content) {
      const ct = Object.keys(resp.content)[0];
      const schema = resp.content[ct];
      if (schema && schema.resolved && schema.resolved.properties) {
        md += renderPropsTable(schema.resolved.properties, schema.resolved.required || []);
        md += '\n';

        // Example response
        const example = renderResponseExample(schema.resolved);
        if (example) {
          md += `<details>\n<summary>Example Response</summary>\n\n`;
          md += '```json\n' + JSON.stringify(example, null, 2) + '\n```\n\n';
          md += `</details>\n\n`;
        }
      }
    }
  }

  // Curl example
  let bodyExample = null;
  if (ep.requestBody) {
    const ct = Object.keys(ep.requestBody)[0];
    const body = ep.requestBody[ct];
    if (body && body.resolved && body.resolved.properties) {
      bodyExample = renderResponseExample(body.resolved);
    }
  }
  const fullPath = BASE + ep.path;
  md += `#### Example Request\n\n`;
  md += '```bash\n' + buildCurlExample(method, fullPath, !!ep.requestBody, bodyExample) + '\n```\n\n';

  md += '---\n\n';
  return md;
}

function generateTagPage(tag, endpoints, meta) {
  let md = '';
  md += `---\nsidebar_position: ${meta.position || 1}\n---\n\n`;
  md += `# ${meta.title}\n\n`;
  md += `${meta.desc}\n\n`;
  md += `## Authentication\n\n`;
  md += `All endpoints in this section require authentication via Bearer token in the \`Authorization\` header unless otherwise noted.\n\n`;
  md += `\`\`\`\nAuthorization: Bearer <your_access_token>\n\`\`\`\n\n`;

  // Endpoints overview table
  md += `## Endpoints Overview\n\n`;
  md += `| Method | Path | Summary |\n`;
  md += `|--------|------|---------|\n`;
  for (const ep of endpoints) {
    md += `| ${methodBadge(ep.method.toUpperCase())} | \`${ep.path}\` | ${escPipe(ep.summary || ep.operationId || '')} |\n`;
  }
  md += `\n`;

  // Detailed endpoints
  md += `## Endpoint Details\n\n`;
  endpoints.forEach((ep, i) => {
    md += generateEndpointSection(ep, i);
  });

  return md;
}

// ============================================================
// Main
// ============================================================

// ============================================================
// OpenAPI (paths) -> endpoints transformer + $ref resolver
// (live spec at /api-json is standard OpenAPI 3.0 with `paths`)
// ============================================================
function getRef(spec, ref) {
  const parts = ref.replace(/^#\//, '').split('/');
  let cur = spec;
  for (const p of parts) cur = cur && cur[decodeURIComponent(p)];
  return cur;
}

function resolveSchema(spec, schema, seen, depth) {
  seen = seen || new Set();
  depth = depth || 0;
  if (!schema || depth > 6) return schema || {};
  if (schema.$ref) {
    if (seen.has(schema.$ref)) return { type: schema.$ref.split('/').pop() };
    const s2 = new Set(seen); s2.add(schema.$ref);
    return resolveSchema(spec, getRef(spec, schema.$ref), s2, depth + 1);
  }
  if (schema.allOf) {
    const merged = { type: 'object', properties: {}, required: [] };
    for (const sub of schema.allOf) {
      const rs = resolveSchema(spec, sub, seen, depth + 1);
      Object.assign(merged.properties, rs.properties || {});
      if (Array.isArray(rs.required)) merged.required.push(...rs.required);
    }
    if (schema.properties) Object.assign(merged.properties, schema.properties);
    if (Array.isArray(schema.required)) merged.required.push(...schema.required);
    return merged;
  }
  return schema;
}

function simplifyProp(spec, prop) {
  if (!prop) return { type: 'object' };
  if (prop.$ref) return { type: prop.$ref.split('/').pop(), description: prop.description };
  if (prop.allOf && prop.allOf[0] && prop.allOf[0].$ref)
    return { type: prop.allOf[0].$ref.split('/').pop(), description: prop.description };
  if (prop.type === 'array' && prop.items) {
    let it = 'object';
    if (prop.items.$ref) it = prop.items.$ref.split('/').pop();
    else if (prop.items.type) it = prop.items.type;
    return { type: 'array', items: { type: it }, enum: prop.enum, description: prop.description };
  }
  return prop;
}

function resolveProps(spec, schema) {
  const resolved = resolveSchema(spec, schema, new Set(), 0);
  if (!resolved || !resolved.properties) return resolved || {};
  const out = { type: resolved.type || 'object', required: resolved.required || [], properties: {} };
  for (const [k, v] of Object.entries(resolved.properties)) out.properties[k] = simplifyProp(spec, v);
  return out;
}

function buildEndpoints(spec) {
  const out = [];
  const METHODS = ['get', 'post', 'put', 'patch', 'delete'];
  for (const [routePath, item] of Object.entries(spec.paths || {})) {
    if (!item) continue;
    for (const method of METHODS) {
      const op = item[method];
      if (!op) continue;
      const rawParams = [...(item.parameters || []), ...(op.parameters || [])];
      const parameters = rawParams
        .map(p => (p && p.$ref ? getRef(spec, p.$ref) : p))
        .filter(Boolean)
        .map(p => ({ ...p, schema: p.schema ? simplifyProp(spec, p.schema) : undefined }));

      let requestBody = null;
      let rb = op.requestBody;
      if (rb && rb.$ref) rb = getRef(spec, rb.$ref);
      if (rb && rb.content) {
        requestBody = {};
        for (const [ct, media] of Object.entries(rb.content))
          requestBody[ct] = { resolved: resolveProps(spec, media.schema) };
      }

      const responses = {};
      for (const [code, resp0] of Object.entries(op.responses || {})) {
        let resp = resp0;
        if (resp && resp.$ref) resp = getRef(spec, resp.$ref);
        const entry = { description: (resp && resp.description) || '' };
        if (resp && resp.content) {
          entry.content = {};
          for (const [ct, media] of Object.entries(resp.content))
            entry.content[ct] = { resolved: resolveProps(spec, media.schema) };
        }
        responses[code] = entry;
      }

      out.push({
        method, path: routePath,
        summary: op.summary || '', description: op.description || '',
        operationId: op.operationId || '',
        tags: op.tags || ['untagged'],
        parameters, requestBody, responses,
      });
    }
  }
  return out;
}

async function main() {
  let spec;

  // Check for --local flag
  const localIdx = process.argv.indexOf('--local');
  if (localIdx !== -1 && process.argv[localIdx + 1]) {
    const filePath = process.argv[localIdx + 1];
    console.log(`Reading spec from local file: ${filePath}`);
    spec = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } else {
    console.log(`Fetching OpenAPI spec from ${API_URL}...`);
    try {
      const raw = await fetchUrl(API_URL);
      spec = JSON.parse(raw);
      // Save a local copy
      fs.writeFileSync(path.join(__dirname, '..', 'openapi-spec.json'), raw);
      console.log('Spec saved to openapi-spec.json');
    } catch (err) {
      console.error('Failed to fetch spec:', err.message);
      console.log('Trying local fallback...');
      const fallback = path.join(__dirname, '..', 'openapi-spec.json');
      if (fs.existsSync(fallback)) {
        spec = JSON.parse(fs.readFileSync(fallback, 'utf-8'));
      } else {
        console.error('No local spec found. Exiting.');
        process.exit(1);
      }
    }
  }

  // Group endpoints by tag (built from OpenAPI `paths`)
  const endpointsByTag = {};
  const allEndpoints = buildEndpoints(spec);
  console.log(`Parsed ${allEndpoints.length} operations from ${Object.keys(spec.paths || {}).length} paths.`);
  for (const ep of allEndpoints) {
    for (const tag of ep.tags || ['untagged']) {
      if (!endpointsByTag[tag]) endpointsByTag[tag] = [];
      endpointsByTag[tag].push(ep);
    }
  }

  // Sort endpoints within each tag: GET first, then POST, PUT, PATCH, DELETE
  const ORDER = { GET: 0, POST: 1, PUT: 2, PATCH: 3, DELETE: 4 };
  for (const tag of Object.keys(endpointsByTag)) {
    endpointsByTag[tag].sort((a, b) => {
      const oa = ORDER[a.method.toUpperCase()] ?? 5;
      const ob = ORDER[b.method.toUpperCase()] ?? 5;
      if (oa !== ob) return oa - ob;
      return a.path.localeCompare(b.path);
    });
  }

  // Generate pages
  let position = 1;
  let generated = 0;
  for (const [tag, meta] of Object.entries(TAG_MAP)) {
    const endpoints = endpointsByTag[tag];
    if (!endpoints || endpoints.length === 0) {
      console.warn(`No endpoints for tag: ${tag}`);
      continue;
    }

    meta.position = position++;
    const dirPath = path.join(DOCS_DIR, meta.dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    const filePath = path.join(dirPath, `${meta.file}.md`);
    const content = generateTagPage(tag, endpoints, meta);
    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${meta.dir}/${meta.file}.md (${endpoints.length} endpoints)`);
    generated++;
  }

  console.log(`\nDone! Generated ${generated} documentation pages.`);
}

main().catch(console.error);
