import gulp from 'gulp';

import generateData from './data.js';
import server from './server.js';
import webpack from './webpack.js';

import { minifyHtml } from './static.js';

export default function () {
    generateData();
    webpack();
    minifyHtml();

    gulp.watch('app/index.html', minifyHtml);
    gulp.watch('data/**/*.yaml', generateData);

    server();
}

export { generateMenu } from './data.js';
