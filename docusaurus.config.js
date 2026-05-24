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
        title: 'ProConnect API',
        logo: {
          alt: 'ProConnect Logo',
          src: 'img/logo.svg',
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
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {label: 'Getting Started', to: '/'},
              {label: 'Authentication', to: '/getting-started/authentication'},
              {label: 'API Reference', to: '/user-management/users'},
            ],
          },
          {
            title: 'Resources',
            items: [
              {label: 'OpenAPI Spec', href: 'https://api.proconnectcareer.com/api-json'},
              {label: 'Swagger UI', href: 'https://api.proconnectcareer.com/api'},
            ],
          },
          {
            title: 'ProConnect',
            items: [
              {label: 'Website', href: 'https://proconnectcareer.com'},
              {label: 'Open On Web', href: 'https://app.proconnectcareer.com'},
              {label: 'GitHub', href: 'https://github.com/Ogah-Rugi'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ProConnect — Empowering Hospitality Careers Across ASEAN.`,
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
      algolia: undefined,
    }),
};

module.exports = config;
