const gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var browserDoc = require('browser-sync').create('documentacion');
var reload = browserSync.reload;
var reloadDoc = browserDoc.reload;

const historyFallback = require('connect-history-api-fallback');

var watcher;
var watcherDoc;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ["build/" + process.env.NODE_ENV],
            routes: {}
        },
        browser: 'chrome'
    }, function() {});
    console.log();
});

gulp.task('browser-sync-doc', function() {
    var mid = historyFallback({
        disableDotRule: false,
        rewrites: [
            { from: /[a-zA-Z.]+:[a-zA-Z]/, to: '/index.html' }
        ]
    });
    browserDoc.init({
            reloadOnRestart: true,
            host: 'localhost',
            port: '8083',
            open: false,
            server: {
                baseDir: ["docs"],
                routes: {}
            },
            middleware: [mid]
        },
        function() {});
});

gulp.task("watch", ['watch:start', 'browser-sync'], function() {
    watcher.on('change', function() {
        runSequence('clean', 'watch:stop', 'lint', 'webpackTask', 'ngdocs', 'watch', reload);
    });
});

gulp.task("watchDoc", ['watchDoc:start', 'browser-sync-doc'], function() {
    watcherDoc.on('change', function() {
        process.env.NODE_ENV = 'dev';
        runSequence('clean', 'watchDoc:stop', 'lint', 'webpackTask', 'ngdocs', 'watchDoc', reloadDoc);
    });
});

gulp.task('watch:stop', function() {
    watcher.end(function() {});
    console.log('stopped watcher');
});

gulp.task('watch:start', function() {
    watcher = gulp.watch('../src/**', { dot: true }, function() {});
    console.log('started watcher');
});

gulp.task('watchDoc:stop', function() {
    watcherDoc.end(function() {});
    console.log('stopped watcher Documentation');
});

gulp.task('watchDoc:start', function() {
    watcherDoc = gulp.watch('../src/**', { dot: true }, function() {});
    console.log('started watcher documentation');
});