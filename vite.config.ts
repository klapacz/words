import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import watchAndRun from '@kitql/vite-plugin-watch-and-run';

export default defineConfig({
	plugins: [
		reactRefresh(),
		tsconfigPaths(),
		watchAndRun([
			{
				watch: '**/*.yaml',
				run: 'npm run build:api',
				delay: 0,
			},
		]),
	],
});
