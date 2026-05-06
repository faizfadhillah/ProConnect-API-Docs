/* =========================================================
   ProConnect API Docs — interactivity + full-site search
   ========================================================= */

(() => {
  'use strict';

  // -----------------------------------------------------
  // Tag-group taxonomy
  // -----------------------------------------------------
  const GROUPS = [
    {
      id: 'user-management',
      label: 'User Management',
      tags: [
        'users', 'user-files', 'user-certificates', 'user-educations',
        'user-languages', 'user-professions', 'user-right-to-works',
        'user-skills', 'user-career-history', 'user-skill-passports',
        'user-subscription', 'user-salary-country', 'user-interests',
        'user-role-assignments', 'User Role Assignments', 'User Accounts',
        'pending-student-verifications', 'encrypted-user-data',
        'bulk-upload',
      ],
    },
    {
      id: 'job-management',
      label: 'Job Management',
      tags: [
        'jobs', 'job-skills', 'job-steps', 'applicants', 'applicant-steps',
        'applicant-legal-files', 'applicant-job-steps', 'skill-match',
      ],
    },
    {
      id: 'company-management',
      label: 'Company Management',
      tags: [
        'mst-companies', 'public-mst-companies', 'company-files',
        'follow-user-to-companies',
      ],
    },
    {
      id: 'master-data',
      label: 'Master Data',
      tags: [
        'mst-schools', 'mst-languages', 'mst-professions', 'mst-skills',
        'mst-regions', 'mst-right-to-works', 'mst-subscription', 'mst-tags',
        'mst-interests', 'mst-salary-country', 'mst-country',
        'mst-asp-competencies', 'mst-departments', 'mst-licenses',
        'mst-majors', 'mst-industries', 'mst-school-majors',
        'mst-education-license-mappings', 'mst-education-profession-mappings',
        'mst-license-skill-mappings', 'mst-informal-certificate-mappings',
      ],
    },
    {
      id: 'social-communication',
      label: 'Social & Communication',
      tags: [
        'posts', 'events', 'event-pakets', 'groups', 'group-members',
        'follow-user-to-user', 'feedbacks', 'firebase', 'notifications',
        'Email Queue Monitoring',
      ],
    },
    {
      id: 'system',
      label: 'System',
      tags: [
        'auth', 'rbac', 'configs', 'logs', 'media', 'storage', 'fields',
        'questionnaires', 'questionnaire-answers', 'invoices',
        'invoices-items', 'data-migration', 'App',
      ],
    },
  ];

  // Endpoint data (loaded from JSON)
  let endpointData = [];

  // Static doc sections for search indexing
  const DOC_SECTIONS = [
    { id: 'introduction', title: 'Introduction', keywords: 'rest api json bearer token firebase base url proconnect platform' },
    { id: 'quickstart', title: 'Quickstart', keywords: 'get started create account firebase token session activate sign up' },
    { id: 'authentication', title: 'Authentication', keywords: 'firebase bearer jwt authorization header token session multi-role accounts login' },
    { id: 'response-envelope', title: 'Response envelope', keywords: 'statuscode message error traceid data response format json' },
    { id: 'errors', title: 'Errors', keywords: 'http status codes 200 400 401 403 404 429 500 bad request unauthorized forbidden not found rate limit server error' },
    { id: 'pagination', title: 'Search & pagination', keywords: 'page limit filters sortby expands search query parameters pagination offset' },
    { id: 'rate-limits', title: 'Rate limits', keywords: 'throttle 60 requests minute otp 429 retry-after backoff' },
    { id: 'versioning', title: 'Versioning', keywords: 'v0.2 backward compatible breaking changes deprecation openapi swagger' },
    { id: 'flow-signup', title: 'Sign up & verify', keywords: 'create user otp email verify candidate registration' },
    { id: 'flow-multi-role', title: 'Multi-role accounts', keywords: 'candidate employer switch active account role assignment' },
    { id: 'flow-apply', title: 'Apply for a job', keywords: 'application jobs public slug applicant documents legal files' },
    { id: 'flow-publish', title: 'Publish a job', keywords: 'employer draft publish job steps open close schedule recruiter' },
    { id: 'webhooks', title: 'Webhooks', keywords: 'email delivered bounced mailjet bull queue job failed fcm notification' },
    { id: 'sdks', title: 'SDKs & libraries', keywords: 'typescript node python php laravel kotlin swift openapi client generator' },
    { id: 'changelog', title: 'Changelog', keywords: 'version release multi-role skill match public jobs bulk upload' },
    { id: 'support', title: 'Support', keywords: 'help center email github issues traceid contact' },
  ];

  // -----------------------------------------------------
  // Utilities
  // -----------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const slugify = (s) =>
    String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const groupForTag = (tag) => {
    const t = String(tag);
    return GROUPS.find((g) => g.tags.includes(t)) || GROUPS[GROUPS.length - 1];
  };

  const colorisePath = (p) =>
    String(p).replace(/:(\w+)/g, '<span class="placeholder">:$1</span>');

  function escapeHTML(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHTML(text);
    const escaped = escapeHTML(text);
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escaped.replace(re, '<mark class="search-highlight">$1</mark>');
  }

  // -----------------------------------------------------
  // Tab switching for code cards
  // -----------------------------------------------------
  function bindTabs(scope = document) {
    $$('.codecard', scope).forEach((card) => {
      const tabs = $$('.tab', card);
      const panes = $$('.codecard__pre', card);
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const id = tab.dataset.tab;
          tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
          panes.forEach((p) => p.classList.toggle('is-hidden', p.dataset.pane !== id));
        });
      });
    });
  }

  // -----------------------------------------------------
  // Copy buttons
  // -----------------------------------------------------
  function bindCopy(scope = document) {
    $$('.copy', scope).forEach((btn) => {
      btn.addEventListener('click', async () => {
        const card = btn.closest('.codecard');
        if (!card) return;
        const visible = $('.codecard__pre:not(.is-hidden)', card);
        const text = visible ? visible.innerText : '';
        try {
          await navigator.clipboard.writeText(text);
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('is-copied');
          setTimeout(() => { btn.textContent = orig; btn.classList.remove('is-copied'); }, 1400);
        } catch { /* silent */ }
      });
    });
  }

  // -----------------------------------------------------
  // Animated counters in the metrics band
  // -----------------------------------------------------
  function animateCounters() {
    const els = $$('.band__num[data-count]');
    if (!els.length) return;
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const dur = 1000;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    els.forEach((el) => obs.observe(el));
  }

  // Update metrics band from actual data
  function updateMetricsBand(data) {
    const totalEndpoints = data.reduce((sum, c) => sum + c.endpoints.length, 0);
    const totalControllers = data.length;
    const bandNums = $$('.band__num[data-count]');
    bandNums.forEach((el) => {
      const label = el.closest('.band__item')?.querySelector('.band__label')?.textContent?.toLowerCase() || '';
      if (label.includes('endpoint')) el.dataset.count = totalEndpoints;
      else if (label.includes('resource')) el.dataset.count = totalControllers;
    });
  }

  // -----------------------------------------------------
  // ★ FULL-SITE SEARCH (Command palette)
  // -----------------------------------------------------
  function buildSearchIndex(data) {
    const index = [];

    // Index documentation sections
    DOC_SECTIONS.forEach((sec) => {
      index.push({
        type: 'doc',
        id: sec.id,
        title: sec.title,
        text: (sec.title + ' ' + sec.keywords).toLowerCase(),
        icon: 'doc',
      });
    });

    // Index each endpoint
    data.forEach((ctrl) => {
      const group = groupForTag(ctrl.tag);
      ctrl.endpoints.forEach((ep) => {
        index.push({
          type: 'endpoint',
          id: `res-${slugify(ctrl.tag)}`,
          method: ep.method,
          path: ep.path,
          summary: ep.summary || '',
          tag: ctrl.tag,
          group: group.label,
          isPublic: ep.isPublic,
          text: (ep.method + ' ' + ep.path + ' ' + (ep.summary || '') + ' ' + ctrl.tag + ' ' + group.label).toLowerCase(),
        });
      });

      // Index each resource/controller as a group
      index.push({
        type: 'resource',
        id: `res-${slugify(ctrl.tag)}`,
        title: ctrl.tag,
        basePath: ctrl.basePath,
        count: ctrl.endpoints.length,
        group: group.label,
        text: (ctrl.tag + ' ' + ctrl.basePath + ' ' + group.label).toLowerCase(),
      });
    });

    return index;
  }

  function initSearch(data) {
    const searchIndex = buildSearchIndex(data);
    const input = $('#searchInput');
    if (!input) return;

    // Create the search overlay
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-modal" role="dialog" aria-label="Search documentation">
        <div class="search-modal__header">
          <svg class="search-modal__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M14 14l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input id="searchModalInput" type="search" placeholder="Search endpoints, docs, resources…" autocomplete="off" />
          <kbd class="search__kbd">ESC</kbd>
        </div>
        <div class="search-modal__body" id="searchResults">
          <div class="search-empty">
            <p class="search-empty__title">Quick navigation</p>
            <p class="search-empty__hint">Type to search across all ${searchIndex.length} indexed items</p>
            <div class="search-shortcuts">
              <div class="search-shortcut"><kbd>↑↓</kbd> Navigate</div>
              <div class="search-shortcut"><kbd>↵</kbd> Open</div>
              <div class="search-shortcut"><kbd>ESC</kbd> Close</div>
            </div>
          </div>
        </div>
        <div class="search-modal__footer">
          <span class="search-modal__count" id="searchCount"></span>
          <span class="search-modal__powered">ProConnect API Docs</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const modal = overlay.querySelector('.search-modal');
    const modalInput = $('#searchModalInput');
    const resultsContainer = $('#searchResults');
    const searchCount = $('#searchCount');
    let activeIdx = -1;

    function openSearch() {
      overlay.classList.add('is-visible');
      modalInput.value = input.value || '';
      modalInput.focus();
      document.body.style.overflow = 'hidden';
      runSearch(modalInput.value);
    }

    function closeSearch() {
      overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
      activeIdx = -1;
    }

    function runSearch(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = `
          <div class="search-empty">
            <p class="search-empty__title">Quick navigation</p>
            <p class="search-empty__hint">Type to search across all ${searchIndex.length} indexed items</p>
            <div class="search-shortcuts">
              <div class="search-shortcut"><kbd>↑↓</kbd> Navigate</div>
              <div class="search-shortcut"><kbd>↵</kbd> Open</div>
              <div class="search-shortcut"><kbd>ESC</kbd> Close</div>
            </div>
          </div>
        `;
        searchCount.textContent = '';
        activeIdx = -1;
        return;
      }

      const terms = q.split(/\s+/);
      const scored = searchIndex
        .map((item) => {
          let score = 0;
          for (const term of terms) {
            if (!item.text.includes(term)) return null;
            // Boost exact matches in path/title
            if (item.path && item.path.toLowerCase().includes(term)) score += 10;
            if (item.title && item.title.toLowerCase().includes(term)) score += 8;
            if (item.method && item.method.toLowerCase() === term) score += 15;
            if (item.tag && item.tag.toLowerCase().includes(term)) score += 5;
            score += 1;
          }
          return { ...item, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);

      if (!scored.length) {
        resultsContainer.innerHTML = `
          <div class="search-empty">
            <p class="search-empty__title">No results for "${escapeHTML(query)}"</p>
            <p class="search-empty__hint">Try different keywords or browse the sidebar</p>
          </div>
        `;
        searchCount.textContent = '0 results';
        activeIdx = -1;
        return;
      }

      // Group results by type
      const docs = scored.filter((r) => r.type === 'doc');
      const resources = scored.filter((r) => r.type === 'resource');
      const endpoints = scored.filter((r) => r.type === 'endpoint');

      let html = '';
      let globalIdx = 0;

      if (docs.length) {
        html += `<div class="search-group"><div class="search-group__label">Documentation</div>`;
        docs.forEach((r) => {
          html += `
            <a href="#${r.id}" class="search-result" data-idx="${globalIdx}" data-href="#${r.id}">
              <span class="search-result__icon search-result__icon--doc">
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 2h5.5L12 4.5V14H4V2z" stroke="currentColor" stroke-width="1.2"/><path d="M9 2v3h3" stroke="currentColor" stroke-width="1.2"/></svg>
              </span>
              <div class="search-result__body">
                <span class="search-result__title">${highlightMatch(r.title, q)}</span>
              </div>
              <span class="search-result__badge">Section</span>
            </a>
          `;
          globalIdx++;
        });
        html += `</div>`;
      }

      if (resources.length) {
        html += `<div class="search-group"><div class="search-group__label">Resources</div>`;
        resources.forEach((r) => {
          html += `
            <a href="#${r.id}" class="search-result" data-idx="${globalIdx}" data-href="#${r.id}">
              <span class="search-result__icon search-result__icon--resource">
                <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M5 6h6M5 8h4M5 10h5" stroke="currentColor" stroke-width="1"/></svg>
              </span>
              <div class="search-result__body">
                <span class="search-result__title">${highlightMatch(r.title, q)}</span>
                <span class="search-result__meta">${escapeHTML(r.basePath)} · ${r.count} endpoints · ${escapeHTML(r.group)}</span>
              </div>
              <span class="search-result__badge">Resource</span>
            </a>
          `;
          globalIdx++;
        });
        html += `</div>`;
      }

      if (endpoints.length) {
        html += `<div class="search-group"><div class="search-group__label">Endpoints</div>`;
        endpoints.slice(0, 30).forEach((r) => {
          const mcls = `search-method search-method--${r.method}`;
          html += `
            <a href="#${r.id}" class="search-result" data-idx="${globalIdx}" data-href="#${r.id}">
              <span class="${mcls}">${r.method}</span>
              <div class="search-result__body">
                <span class="search-result__title search-result__path">${highlightMatch(r.path, q)}</span>
                ${r.summary ? `<span class="search-result__meta">${highlightMatch(r.summary, q)}</span>` : ''}
              </div>
              <span class="search-result__badge">${r.isPublic ? 'public' : 'auth'}</span>
            </a>
          `;
          globalIdx++;
        });
        html += `</div>`;
      }

      resultsContainer.innerHTML = html;
      searchCount.textContent = `${scored.length} result${scored.length === 1 ? '' : 's'}`;
      activeIdx = 0;
      updateActiveResult();
    }

    function updateActiveResult() {
      $$('.search-result', resultsContainer).forEach((el, i) => {
        el.classList.toggle('is-active', i === activeIdx);
        if (i === activeIdx) el.scrollIntoView({ block: 'nearest' });
      });
    }

    function navigateResult(dir) {
      const results = $$('.search-result', resultsContainer);
      if (!results.length) return;
      activeIdx = (activeIdx + dir + results.length) % results.length;
      updateActiveResult();
    }

    function selectResult() {
      const results = $$('.search-result', resultsContainer);
      if (activeIdx >= 0 && activeIdx < results.length) {
        const href = results[activeIdx].dataset.href;
        closeSearch();
        location.hash = href;
        // Open the target card if it's a resource
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target && target.classList.contains('resource-card') && !target.classList.contains('is-open')) {
            target.classList.add('is-open');
          }
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.classList.add('is-flash');
            setTimeout(() => target.classList.remove('is-flash'), 1200);
          }
        }, 50);
      }
    }

    // Event handlers
    modalInput.addEventListener('input', () => runSearch(modalInput.value));

    modalInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); navigateResult(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); navigateResult(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); selectResult(); }
      else if (e.key === 'Escape') { closeSearch(); }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });

    resultsContainer.addEventListener('click', (e) => {
      const result = e.target.closest('.search-result');
      if (result) {
        e.preventDefault();
        const idx = parseInt(result.dataset.idx, 10);
        activeIdx = idx;
        selectResult();
      }
    });

    // "/" or click the topbar search opens the modal
    input.addEventListener('focus', (e) => { e.preventDefault(); input.blur(); openSearch(); });
    input.addEventListener('click', (e) => { e.preventDefault(); openSearch(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !overlay.classList.contains('is-visible') &&
          !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
        closeSearch();
      }
      // Cmd/Ctrl+K also opens search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (overlay.classList.contains('is-visible')) closeSearch();
        else openSearch();
      }
    });

    // Also keep the inline filter working for when modal is closed
    input.addEventListener('input', () => {
      applyInlineFilter(input.value);
    });
  }

  function applyInlineFilter(query) {
    const q = query.trim().toLowerCase();
    const cards = $$('.resource-card');
    cards.forEach((card) => {
      const tag = card.id.toLowerCase();
      let any = false;
      $$('.endpoint', card).forEach((ep) => {
        const ok = !q || ep.dataset.search.includes(q) || tag.includes(q);
        ep.style.display = ok ? '' : 'none';
        if (ok) any = true;
      });
      card.style.display = any ? '' : 'none';
    });
    $$('.reference-group').forEach((grp) => {
      const visible = $$('.resource-card', grp).some((c) => c.style.display !== 'none');
      grp.style.display = visible ? '' : 'none';
    });
  }

  // -----------------------------------------------------
  // Render API reference + sidebar from endpoints.json
  // -----------------------------------------------------
  async function renderReference() {
    const refRoot = $('#reference');
    const navRoot = $('#resourceList');
    if (!refRoot || !navRoot) return;

    let data;
    try {
      const res = await fetch('assets/endpoints.json', { cache: 'no-cache' });
      data = await res.json();
    } catch (err) {
      refRoot.innerHTML =
        '<p class="callout callout--warn">Could not load <code>assets/endpoints.json</code>. ' +
        'Serve this site through an HTTP server.</p>';
      console.error(err);
      return;
    }

    endpointData = data;
    updateMetricsBand(data);

    // Bucket controllers by group
    const buckets = new Map(GROUPS.map((g) => [g.id, []]));
    data.forEach((ctrl) => {
      const grp = groupForTag(ctrl.tag);
      buckets.get(grp.id).push(ctrl);
    });
    for (const [, list] of buckets) {
      list.sort((a, b) => (a.tag || '').localeCompare(b.tag || ''));
    }

    // API Reference cards
    const refHTML = GROUPS.map((g) => {
      const ctrls = buckets.get(g.id);
      if (!ctrls || !ctrls.length) return '';
      const cards = ctrls.map((c) => renderResourceCard(c)).join('');
      return `
        <div class="reference-group" data-group="${g.id}">
          <h3 class="reference-group__title" id="grp-${g.id}">${g.label}</h3>
          ${cards}
        </div>
      `;
    }).join('');
    refRoot.innerHTML = refHTML;

    // Sidebar resource list
    const navHTML = GROUPS.map((g) => {
      const ctrls = buckets.get(g.id);
      if (!ctrls || !ctrls.length) return '';
      return `
        <li>
          <a href="#grp-${g.id}" class="nav__link nav__link--group">${g.label}
            <span class="nav__count">${ctrls.reduce((a, c) => a + c.endpoints.length, 0)}</span>
          </a>
          <ul class="nav__sub">
            ${ctrls.map((c) =>
              `<li><a href="#res-${slugify(c.tag)}" class="nav__link">${escapeHTML(c.tag)}</a></li>`
            ).join('')}
          </ul>
        </li>
      `;
    }).join('');
    navRoot.innerHTML = navHTML;

    // Dynamic style injection
    if (!document.getElementById('dyn-style')) {
      const s = document.createElement('style');
      s.id = 'dyn-style';
      s.textContent = `
        .nav__link--group { font-weight: 600; color: var(--pc-navy); display:flex; justify-content:space-between; align-items:center; }
        .nav__count { font-size: 11px; color: var(--pc-text-3); background: var(--pc-bg-soft); border:1px solid var(--pc-line); padding: 1px 7px; border-radius: 999px; font-family:'JetBrains Mono', monospace; }
        .reference-group { margin-bottom: 32px; }
        .reference-group__title { font-size: 20px; margin: 16px 0 14px; padding-top: 12px; border-top: 1px solid var(--pc-line); color: var(--pc-navy); }
        .reference-group:first-child .reference-group__title { border-top: 0; padding-top: 0; }
      `;
      document.head.appendChild(s);
    }

    // Collapsible resource cards
    $$('.resource-card__head').forEach((head) => {
      head.addEventListener('click', () => head.parentElement.classList.toggle('is-open'));
    });

    // Expandable endpoint details (click to toggle DTO/params view)
    $$('.endpoint--expandable').forEach((ep) => {
      ep.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // don't interfere with links
        ep.classList.toggle('is-expanded');
      });
    });

    // Filter chips
    $$('.filters .chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const target = chip.dataset.filter;
        $$('.filters .chip').forEach((c) => c.classList.toggle('chip--active', c === chip));
        $$('#reference .reference-group').forEach((grp) => {
          grp.style.display = (target === 'all' || grp.dataset.group === target) ? '' : 'none';
        });
      });
    });

    if (location.hash) openHashTarget();
    bindTabs(refRoot);
    bindCopy(refRoot);
    initSearch(data);
  }

  function renderResourceCard(ctrl) {
    const id = `res-${slugify(ctrl.tag)}`;
    const eps = ctrl.endpoints.map((e) => {
      const cls = `method method--${e.method}`;
      const badge = e.isPublic
        ? '<span class="badge badge--public">public</span>'
        : '<span class="badge badge--auth">auth</span>';
      const searchText = (e.method + ' ' + e.path + ' ' + (e.summary || '') + ' ' + (e.requestBody || '')).toLowerCase();

      // Build expandable details if enriched data exists
      let details = '';
      if (e.requestBody || (e.bodyFields && e.bodyFields.length) || (e.queryParams && e.queryParams.length)) {
        let detailContent = '';
        if (e.requestBody) {
          detailContent += `<div class="ep-detail__section"><span class="ep-detail__label">Request body</span><code class="ep-detail__dto">${escapeHTML(e.requestBody)}</code></div>`;
        }
        if (e.bodyFields && e.bodyFields.length) {
          const fieldsHTML = e.bodyFields.map((f) =>
            `<div class="ep-field"><code class="ep-field__name">${escapeHTML(f.name)}</code><span class="ep-field__type">${escapeHTML(f.type)}</span>${f.optional ? '<span class="ep-field__opt">optional</span>' : ''}</div>`
          ).join('');
          detailContent += `<div class="ep-detail__section"><span class="ep-detail__label">Body fields</span><div class="ep-fields">${fieldsHTML}</div></div>`;
        }
        if (e.queryParams && e.queryParams.length) {
          detailContent += `<div class="ep-detail__section"><span class="ep-detail__label">Query params</span>${e.queryParams.map(q => `<code class="ep-detail__param">${escapeHTML(q)}</code>`).join(' ')}</div>`;
        }
        details = `<div class="ep-details">${detailContent}</div>`;
      }

      const hasDetails = details ? 'endpoint--expandable' : '';
      return `
        <div class="endpoint ${hasDetails}" data-search="${escapeHTML(searchText)}">
          <span class="${cls}">${e.method}</span>
          <div>
            <span class="endpoint__path">${colorisePath(escapeHTML(e.path))}</span>
            ${e.summary ? `<span class="endpoint__summary">${escapeHTML(e.summary)}</span>` : ''}
          </div>
          <div>${badge}</div>
          ${details}
        </div>
      `;
    }).join('');

    return `
      <article class="resource-card is-open" id="${id}">
        <header class="resource-card__head">
          <div>
            <h4 class="resource-card__title">${escapeHTML(ctrl.tag)}</h4>
            <span class="resource-card__base">${escapeHTML(ctrl.basePath || '/')}</span>
          </div>
          <div class="resource-card__meta">
            <span class="resource-card__count">${ctrl.endpoints.length} endpoint${ctrl.endpoints.length === 1 ? '' : 's'}</span>
            <svg class="resource-card__chev" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </header>
        <div class="resource-card__body">${eps}</div>
      </article>
    `;
  }

  // -----------------------------------------------------
  // Hash target highlight
  // -----------------------------------------------------
  function openHashTarget() {
    const id = location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('is-flash');
    setTimeout(() => el.classList.remove('is-flash'), 1200);
  }

  // -----------------------------------------------------
  // Sidebar scroll spy
  // -----------------------------------------------------
  function bindScrollSpy() {
    const sections = $$('.section, .resource-card, .reference-group, .flow');
    const links = $$('.sidebar .nav__link');
    if (!sections.length || !links.length) return;
    const linkFor = (id) => links.find((a) => a.getAttribute('href') === `#${id}`);
    let active = null;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const link = linkFor(e.target.id);
        if (!link) return;
        if (active) active.classList.remove('is-active');
        link.classList.add('is-active');
        active = link;
      });
    }, { rootMargin: '-30% 0px -65% 0px', threshold: 0 });
    sections.forEach((s) => s.id && obs.observe(s));
  }

  // -----------------------------------------------------
  // Build metadata (last updated)
  // -----------------------------------------------------
  function loadBuildMeta() {
    fetch('assets/build-meta.json')
      .then((r) => r.ok ? r.json() : null)
      .then((meta) => {
        if (!meta) return;
        const el = document.querySelector('.footer__copy');
        if (!el) return;
        const d = new Date(meta.generatedAt);
        const fmt = d.toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
        });
        const badge = document.createElement('span');
        badge.className = 'footer__updated';
        badge.textContent = ` · Docs updated ${fmt}`;
        badge.style.cssText = 'opacity:.6;font-size:.85em;';
        el.appendChild(badge);
      })
      .catch(() => {});
  }

  // -----------------------------------------------------
  // Boot
  // -----------------------------------------------------
  document.addEventListener('DOMContentLoaded', async () => {
    bindTabs();
    bindCopy();
    animateCounters();
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
    await renderReference();
    bindScrollSpy();
    loadBuildMeta();
    window.addEventListener('hashchange', openHashTarget);
  });
})();
