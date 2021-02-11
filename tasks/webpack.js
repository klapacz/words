import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import path from 'path';

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
			'@root': path.resolve(process.env.PWD),
			'@': path.resolve(process.env.PWD, 'app'),
		},
		extensions: ['.ts', '.tsx', '.js'],
	},

	plugins: [new webpack.EnvironmentPlugin(['BASE_URL'])],

	output: {
		filename: 'index.js',
	},
};

export default function () {
	return gulp.src('app/index.tsx').pipe(webpackStream(config, webpack)).pipe(gulp.dest('dist/'));
}
