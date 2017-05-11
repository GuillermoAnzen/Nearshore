var gulp = require('gulp');
var gulpDocs = require('gulp-ngdocs');

gulp.task('ngdocs', function() {
    return gulp.src('../src/**/*.js')
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('../docs'));
});