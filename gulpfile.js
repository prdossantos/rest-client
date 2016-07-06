var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
	return gulp.src('rest-client.js')
	.pipe(uglify()).on('error',function(err){
		console.error('Error '+ err.toString())
	})
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/'))
	.pipe(gulp.dest('./'));
});

