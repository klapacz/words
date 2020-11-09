import gulp from 'gulp';

import compileData from './data.js';
import server from './server.js';
import webpack from './webpack.js';

import { minifyHtml } from './static.js';

export default function () {
    compileData();
    webpack();
    minifyHtml();

    gulp.watch('app/index.html', minifyHtml);
    gulp.watch('data/**/*.yaml', compileData);

    server();
}
