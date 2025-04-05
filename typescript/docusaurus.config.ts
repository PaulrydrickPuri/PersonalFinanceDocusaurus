import { themes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Personal Finance Tracker',
  tagline: 'Take control of your finances with AI-powered insights',
  favicon: 'img/favicon.ico',
  url: 'http://localhost:3000',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      'classic',
      {
        docs: { sidebarPath: './sidebars.ts' },
        blog: { showReadingTime: true },
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Finance Tracker',
      items: [
        { to: '/docs/setup', label: 'Docs', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Personal Finance Tracker`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
  },
};

export default config;