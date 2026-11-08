import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://czmj.github.io',
  output: 'static',
  integrations: [react(), mdx()],
});
