import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import watchAndRun from '@kitql/vite-plugin-watch-and-run';
import checker from 'vite-plugin-checker';
import { scripts } from './package.json';

export default defineConfig({
	base: process.env.BASE_URL || '/',
	plugins: [
		reactRefresh(),
		tsconfigPaths(),
		watchAndRun([
			{
				watch: '**/*.yaml',
				run: 'pnpm run build:api',
				delay: 0,
			},
		]),
		checker({
			typescript: true,
			eslint: {
				lintCommand: scripts.lint,
			},
		}),
	],
});
