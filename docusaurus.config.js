// @ts-check
const {themes: prismThemes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ProConnect API',
  tagline: 'Professional Career Connection Platform - API Documentation',
  favicon: 'img/favicon.ico',
  url: 'https://docs.proconnectcareer.com',
  baseUrl: '/',
  organizationName: 'proconnect',
  projectName: 'proconnect-api-docs',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 12,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/Ogah-Rugi/proconnect-api-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/proconnect-social-card.png',
      navbar: {
        title: '',
        logo: {
          alt: 'ProConnect Logo',
          src: 'img/logo.svg',
          style: {height: '32px'},
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API Reference',
          },
          {
            href: 'https://api.proconnectcareer.com/api-json',
            label: 'OpenAPI Spec',
            position: 'right',
          },
          {
            href: 'https://github.com/Ogah-Rugi/ProConnect-CMS',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://proconnectcareer.com/',
            label: 'ProConnect Website',
            position: 'right',
            className: 'navbar__link--website',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: ' ',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
