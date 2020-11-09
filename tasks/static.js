import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';

export function minifyHtml() {
    return gulp
        .src('app/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}
