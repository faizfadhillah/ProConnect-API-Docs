/* =========================================================
   ProConnect API Docs — interactivity
   ========================================================= */

(() => {
  'use strict';

  // -----------------------------------------------------
  // Tag-group taxonomy (matches the Swagger tag groups
  // in the upstream ProConnect API main.ts).
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

  // -----------------------------------------------------
  // Utilities
  // -----------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const slugify = (s) =>
    String(s).toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const groupForTag = (tag) => {
    const t = String(tag);
    return GROUPS.find((g) => g.tags.includes(t)) || GROUPS[GROUPS.length - 1];
  };

  const colorisePath = (p) =>
    String(p).replace(/:(\w+)/g, '<span class="placeholder">:$1</span>');

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
          panes.forEach((p) =>
            p.classList.toggle('is-hidden', p.dataset.pane !== id)
          );
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
          setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('is-copied');
          }, 1400);
        } catch {
          /* fall back silently */
        }
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

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => obs.observe(el));
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
        'Serve this site through an HTTP server (the file:// protocol blocks <code>fetch</code>).</p>';
      console.error(err);
      return;
    }

    // Bucket controllers by group
    const buckets = new Map(GROUPS.map((g) => [g.id, []]));
    data.forEach((ctrl) => {
      const grp = groupForTag(ctrl.tag);
      buckets.get(grp.id).push(ctrl);
    });

    // Sort within each bucket by tag/basePath, alpha
    for (const [, list] of buckets) {
      list.sort((a, b) => (a.tag || '').localeCompare(b.tag || ''));
    }

    // ---- API Reference cards ----
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

    // ---- Sidebar resource list ----
    const navHTML = GROUPS.map((g) => {
      const ctrls = buckets.get(g.id);
      if (!ctrls || !ctrls.length) return '';
      return `
        <li>
          <a href="#grp-${g.id}" class="nav__link nav__link--group">${g.label}
            <span class="nav__count">${ctrls.reduce((a, c) => a + c.endpoints.length, 0)}</span>
          </a>
          <ul class="nav__sub">
            ${ctrls
              .map(
                (c) =>
                  `<li><a href="#res-${slugify(c.tag)}" class="nav__link">${escapeHTML(c.tag)}</a></li>`
              )
              .join('')}
          </ul>
        </li>
      `;
    }).join('');
    navRoot.innerHTML = navHTML;

    // Inject minimal extra CSS for nav count + group title
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

    // ---- Click-to-toggle resource cards ----
    $$('.resource-card__head').forEach((head) => {
      head.addEventListener('click', () => {
        head.parentElement.classList.toggle('is-open');
      });
    });

    // ---- Filter chips ----
    $$('.filters .chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const target = chip.dataset.filter;
        $$('.filters .chip').forEach((c) => c.classList.toggle('chip--active', c === chip));
        $$('#reference .reference-group').forEach((grp) => {
          const show = target === 'all' || grp.dataset.group === target;
          grp.style.display = show ? '' : 'none';
        });
      });
    });

    // ---- Open the deep-linked card if any ----
    if (location.hash) openHashTarget();

    // Re-bind dynamic content
    bindTabs(refRoot);
    bindCopy(refRoot);

    // Wire up search now that data is in the DOM
    bindSearch();
  }

  function renderResourceCard(ctrl) {
    const id = `res-${slugify(ctrl.tag)}`;
    const eps = ctrl.endpoints
      .map((e) => {
        const cls = `method method--${e.method}`;
        const badge = e.isPublic
          ? '<span class="badge badge--public">public</span>'
          : '<span class="badge badge--auth">auth</span>';
        return `
          <div class="endpoint" data-search="${escapeHTML((e.method + ' ' + e.path + ' ' + (e.summary || '')).toLowerCase())}">
            <span class="${cls}">${e.method}</span>
            <div>
              <span class="endpoint__path">${colorisePath(escapeHTML(e.path))}</span>
              ${e.summary ? `<span class="endpoint__summary">${escapeHTML(e.summary)}</span>` : ''}
            </div>
            <div>${badge}</div>
          </div>
        `;
      })
      .join('');

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
        <div class="resource-card__body">
          ${eps}
        </div>
      </article>
    `;
  }

  function escapeHTML(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // -----------------------------------------------------
  // Search (filters cards + endpoints in real time)
  // -----------------------------------------------------
  function bindSearch() {
    const input = $('#searchInput');
    if (!input) return;

    const apply = () => {
      const q = input.value.trim().toLowerCase();
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
      // Hide groups with no visible cards
      $$('.reference-group').forEach((grp) => {
        const visible = $$('.resource-card', grp).some((c) => c.style.display !== 'none');
        grp.style.display = visible ? '' : 'none';
      });
    };

    input.addEventListener('input', apply);

    // "/" focuses search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      } else if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        apply();
        input.blur();
      }
    });
  }

  // -----------------------------------------------------
  // Hash target highlight: scroll into view + flash
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
  // Sidebar active link tracking with IntersectionObserver
  // -----------------------------------------------------
  function bindScrollSpy() {
    const sections = $$('.section, .resource-card, .reference-group, .flow');
    const links = $$('.sidebar .nav__link');
    if (!sections.length || !links.length) return;

    const linkFor = (id) =>
      links.find((a) => a.getAttribute('href') === `#${id}`);

    let active = null;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const link = linkFor(e.target.id);
          if (!link) return;
          if (active) active.classList.remove('is-active');
          link.classList.add('is-active');
          active = link;
        });
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((s) => s.id && obs.observe(s));
  }

  // -----------------------------------------------------
  // Boot
  // -----------------------------------------------------
  document.addEventListener('DOMContentLoaded', async () => {
    bindTabs();
    bindCopy();
    animateCounters();

    // Footer year
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();

    await renderReference();
    bindScrollSpy();

    window.addEventListener('hashchange', openHashTarget);
  });
})();
