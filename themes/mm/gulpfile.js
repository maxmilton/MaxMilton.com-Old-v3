'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var exec        = require('child_process').exec;
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');

gulp.task('default', ['watch']);
gulp.task('build', ['sass', 'js', 'hugo']);
gulp.task('watch', ['serve']);

//----------------------------------------
// Browser Sync
//----------------------------------------

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {
  browserSync.init({
    server: './../../public',
  });

  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./static/js/**/*.js', ['js']);
  gulp.watch(['./layouts/**/*.html', './../../content/**/*.md'], ['hugo']);
  gulp.watch(['./../../public/**/*.html']).on('change', browserSync.reload);
});

//----------------------------------------
// Hugo
//----------------------------------------

gulp.task('hugo', function(fetch) {
  exec('hugo -s ../../', function(err, stdout, stderr) {
    console.log(stdout); // Hugo output
    console.log(stderr); // Debugging
    fetch(err);
  })
});

//----------------------------------------
// CSS
//----------------------------------------

gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix({
			browsers: ['last 2 versions'],
			cascade: false,
		}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./static/css/'))
    .pipe(browserSync.stream());
});

//----------------------------------------
// JS
//----------------------------------------

gulp.task('js', function () {
  return gulp.src(['./static/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // TODO: Optimise JS
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.stream());
});
