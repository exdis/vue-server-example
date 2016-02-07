var gulp = require('gulp');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var ts = require('gulp-typescript');
var jade = require('gulp-jade');
var vueCompile = require('gulp-vue-compile');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var bower = require('main-bower-files');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('webpack', function (callback) {
    webpack(require('./webpack.config.js'), function (err, stats) {
        if (!err) {
            callback();
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('**/*.ts', function () {
        runSequence('ts', 'webpack');
    });
    gulp.watch('**/*.jade', function () {
        runSequence('templatesCopy', 'templatesCompile', 'webpack');
    });
    gulp.watch('src/client/**/*.ts', ['webpack']);
});

gulp.task('templatesCopy', function () {
    gulp.src('src/**/*.jade')
        .pipe(copy('dist', {prefix: 1}));
});

gulp.task('templatesCompile', function () {
    gulp.src('src/**/*.jade')
        .pipe(jade())
        .pipe(vueCompile())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(
                'templates',
                'templates/compiled'
            );
            path.extname = '.jade';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('vendors', function () {
    return gulp.src(bower(), {base: 'vendors'})
        .pipe(uglify())
        .pipe(rename('vendors.min.js'))
        .pipe(gulp.dest('static/js'))
});

gulp.task('dev', function () {
    runSequence(
        'vendors',
        'templatesCopy',
        'templatesCompile',
        'ts',
        'watch'
    );
    nodemon({script: 'dist/server/server.js'});
});
