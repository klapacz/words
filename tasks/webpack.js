import gulp from 'gulp';
import webpack from 'webpack-stream';
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

	output: {
		filename: 'index.js',
	},
};

export default function () {
	return gulp.src('app/index.tsx').pipe(webpack(config)).pipe(gulp.dest('dist/'));
}
