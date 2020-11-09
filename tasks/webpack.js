import gulp from 'gulp';
import webpack from 'webpack-stream';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    watch: !isProduction,
    mode: process.env.NODE_ENV || 'production',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        alias: {
            '@': './client',
        },
    },

    output: {
        filename: 'index.js',
    },
};

export default function () {
    return gulp
        .src('app/index.tsx')
        .pipe(webpack(config))
        .pipe(gulp.dest('dist/'));
}