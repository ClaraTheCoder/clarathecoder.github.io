import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Writing is dev-only until the first articles are finished: its routes live
// outside src/pages and are only injected by `astro dev`.
const devOnlyWriting = {
  name: 'dev-only-writing',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({ pattern: '/writing', entrypoint: './src/routes/writing/index.astro' });
      injectRoute({ pattern: '/writing/[slug]', entrypoint: './src/routes/writing/[slug].astro' });
    },
  },
};

export default defineConfig({
  site: 'https://czmj.github.io',
  output: 'static',
  integrations: [react(), mdx(), devOnlyWriting],
});
