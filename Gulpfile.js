var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('**/*.ts', ['ts']);
});

gulp.task('dev', ['ts', 'watch'], function () {
    nodemon({
        script: 'dist/server/server.js'
    });
});
