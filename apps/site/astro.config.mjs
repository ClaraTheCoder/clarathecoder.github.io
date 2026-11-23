import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// The drafts index is a dev-only page: its route lives outside src/pages and
// is only injected by `astro dev`.
const devOnlyDrafts = {
  name: 'dev-only-drafts',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({ pattern: '/writing/drafts', entrypoint: './src/routes/drafts.astro' });
    },
  },
};

export default defineConfig({
  site: 'https://clarathecoder.github.io',
  output: 'static',
  integrations: [react(), mdx(), devOnlyDrafts],
});
