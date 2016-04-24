'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var exec        = require('child_process').exec;
var sass        = require('gulp-sass');
var uncss       = require('gulp-uncss');
var sourcemaps  = require('gulp-sourcemaps');
var nano        = require('gulp-cssnano');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglifyjs');
var htmlmin     = require('gulp-htmlmin');

gulp.task('default', ['watch']);
gulp.task('build', ['css:build', 'js:build', 'html:build']);
gulp.task('watch', ['serve']);

//----------------------------------------
// Browser Sync
//----------------------------------------

// Static Server + watching scss/html files
gulp.task('serve', ['css', 'js'], function() {
  browserSync.init({
    server: '../../public',
    notify: false,
  });

  // FIXME: Run hugo AFTER sass/js to avoid having to save twice to see a change
  gulp.watch('./scss/**/*.scss', ['css']);
  gulp.watch('./static/js/**/*.js', ['js']);
  gulp.watch(['../../content/**/*.md', './layouts/**/*.html'], ['hugo']);
  gulp.watch(['../../public/**/*.html']).on('change', browserSync.reload);
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

gulp.task('hugo:build', ['css:build', 'js:build'], function(fetch) {
  exec('hugo -s ../../', function(err, stdout, stderr) {
    console.log(stdout); // Hugo output
    console.log(stderr); // Debugging
    fetch(err);
  })
});

//----------------------------------------
// CSS
//----------------------------------------

gulp.task('css', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./static/css/'))
    .pipe(browserSync.stream());
});

gulp.task('css:build', ['css', 'hugo'], function () {
  return gulp.src('./static/css/app.css')
  .pipe(uncss({
    html: ['../../public/**/*.html'],
  }))
  .pipe(prefix({
    browsers: ['> 1%', 'last 2 versions'],
    cascade: false,
  }))
  .pipe(nano())
  .pipe(gulp.dest('./static/css/'))
});

//----------------------------------------
// JS
//----------------------------------------

gulp.task('js', function () {
  return gulp.src(['./static/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.stream());
});

gulp.task('js:build', ['js'], function () {
  return gulp.src('./static/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./static/js/'))
});

//----------------------------------------
// HTML
//----------------------------------------

gulp.task('html:build', ['hugo:build'], function () {
  return gulp.src('../../public/**/*.html')
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      // collapseInlineTagWhitespace: true, //NEW
      collapseWhitespace: true,
      minifyJS: true,
      preserveLineBreaks: true,
      // quoteCharacter: '"', //NEW
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      // removeOptionalTags: true, //NEW
      removeRedundantAttributes: true,
    }))
    .pipe(gulp.dest('../../public'))
});
