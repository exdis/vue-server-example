var gulp = require('gulp');
var ts = require('gulp-typescript');
var jade = require('gulp-jade');
var vueCompile = require('gulp-vue-compile');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('**/*.ts', ['ts']);
    gulp.watch('**/*.jade', ['templates']);
});

gulp.task('templates', function () {
    return gulp.src('src/**/*.jade')
        .pipe(jade())
        .pipe(vueCompile())
        .pipe(rename(function (path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['templates', 'ts', 'watch'], function () {
    nodemon({
        script: 'dist/server/server.js'
    });
});
