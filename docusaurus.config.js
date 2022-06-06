// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const baseUrl = process.env.BASE_URL || '/starcoin-cookbook/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Starcoin Cookbook',
  tagline: 'How to developing on starcoin',
  url: 'https://starcoinorg.github.io',
  baseUrl: baseUrl,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'staroinorg', // Usually your GitHub org/user name.
  projectName: 'starcoin-cookbook', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      zh: {
        label: '中文',
        htmlLang: 'zh-CN',
      },
    },
  },
	plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/starcoinorg/starcoin-cookbook/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/starcoinorg/starcoin-cookbook/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Starcoin Cookbook',
        logo: {
          alt: 'Starcoin Cookbook',
          src: '/img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documents',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/starcoinorg/starcoin-cookbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documents',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/starcoin',
              },
              {
                label: 'Discord',
                href: 'https://discor.gg/starcoin',
              },
              {
                label: 'Developer Telegram group',
                href: 'https://t.me/starcoin_contributor',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/StarcoinSTC',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/starcoinorg/starcoin',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Starcoin, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
