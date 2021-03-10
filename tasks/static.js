import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';

export function minifyHtml() {
	return gulp
		.src('app/*.html')
		.pipe(replace('%BASE_URL%', process.env.BASE_URL || ''))
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
}
