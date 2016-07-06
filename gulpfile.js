var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('default', function() {
	return gulp.src('rest-client.js')
	.pipe(jsmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/'))
	.pipe(gulp.dest('./'));
});

