var gulp = require('gulp');
var karma = require('karma').Server;
const path = require('path');

gulp.task('testKarma', function(done) {
    new karma({
        configFile: path.win32.resolve(process.cwd(), '..') + '/conf/karma.conf.js'
    }, function() { done(); }).start();
});