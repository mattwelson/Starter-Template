/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');

gulp.task('sass', ['clean:css'], function () {
    return gulp.src('Content/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('clean:css', function (cb) {
    return rimraf('wwwroot/css/*.min.css', cb);
});

gulp.task('min:css', [ 'sass' ], function () {
    return gulp.src(["wwwroot/css/*.css", "!wwwwroot/css/*.min.css"])
        .pipe(concat('wwwroot/css/main.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('css:watch', function () {
    gulp.watch('Content/scss/*.scss', ['sass', 'clean:css', 'min:css']);
})