var webpack = require('webpack-stream');
var gulp = require('gulp');
var del = require('del');
var path = require('path');

gulp.task('webpackTask', function() {
    return gulp.src('../src/app.js')
        .pipe(webpack(require('../conf/' + process.env.NODE_ENV + '/webpack.config.js')))
        .pipe(gulp.dest('../build/' + process.env.NODE_ENV));
});


gulp.task('clean', function() {
    var route = path.win32.resolve(process.cwd(), '..') + '/build/' + process.env.NODE_ENV;
    return del([route + '/js'], { force: true });
});