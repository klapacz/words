import gulp from 'gulp';

import generateData from './data.js';
import server from './server.js';
import webpack from './webpack.js';

import { minifyHtml } from './static.js';

export default gulp.series(
	generateData,
	minifyHtml,
	gulp.parallel(
		server,
		webpack,
		() => gulp.watch('app/*.html', minifyHtml),
		() => gulp.watch('data/**/*.yaml', generateData)
	)
);

export const build = gulp.parallel(generateData, webpack, minifyHtml);

export { generateMenu } from './data.js';
export { server };
