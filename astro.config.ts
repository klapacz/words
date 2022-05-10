import { defineConfig } from 'astro/config';
import WindiCSS from 'vite-plugin-windicss'

// https://astro.build/config
export default defineConfig({
  base: process.env.BASE_URL || '/',
  vite: {
    ssr: {
      // https://github.com/natemoo-re/astro-icon#setup
      external: ["svgo"],
    },
    plugins: [WindiCSS()],
  },
});
