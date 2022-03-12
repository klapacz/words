import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import watchAndRun from '@kitql/vite-plugin-watch-and-run';
import checker from 'vite-plugin-checker';

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
				lintCommand: 'eslint .',
			},
			// TODO: enable when ts errors resolved
			enableBuild: false,
		}),
	],
});
