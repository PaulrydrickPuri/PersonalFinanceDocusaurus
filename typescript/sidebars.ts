import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  financeSidebar: [
    'setup',
    { type: 'category', label: 'Usage', items: ['usage/tracking', 'usage/budgeting'] },
    'customization',
    'ai-advisor',
  ],
};

export default sidebars;