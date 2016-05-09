'use strict';

var browserSync = require('browser-sync').create();
var concat      = require('gulp-concat');
var del         = require('del');
var exec        = require('child_process').exec;
var gulp        = require('gulp');
var htmlmin     = require('gulp-htmlmin');
var nano        = require('gulp-cssnano');
var rename      = require('gulp-rename');
var replace     = require('gulp-rev-replace');
var rev         = require('gulp-rev');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglifyjs');
var uncss       = require('gulp-uncss');

gulp.task('default', ['watch']);
gulp.task('watch', ['serve']);
gulp.task('build', ['css:build', 'js:build', 'html:build', 'html:rev', 'clean:build']);

//----------------------------------------
// Browser Sync
//----------------------------------------

gulp.task('serve', ['css', 'js'], function() {
  browserSync.init({
    server: '../../public',
    // notify: false,
  });

  // FIXME: Run hugo AFTER sass/js to avoid having to save twice to see a change
  gulp.watch('./scss/**/*.scss', ['css', 'hugo']);
  gulp.watch('./static/js/**/*.js', ['js', 'hugo']);
  gulp.watch(['../../content/**/*.md', './layouts/**/*.html'], ['hugo']);
  gulp.watch(['../../public/**/*.html']).on('change', browserSync.reload);
});

//----------------------------------------
// Hugo
//----------------------------------------

gulp.task('hugo', function(fetch) {
  exec('hugo -s ../../ --buildDrafts --baseUrl="http://localhost:3000/"', function(err, stdout, stderr) {
    console.log(stdout); // Hugo output
    console.log(stderr); // Errors
    fetch(err);
  })
});

gulp.task('hugo:build', ['css:build', 'js:build'], function(fetch) {
  exec('hugo -s ../../', function(err, stdout, stderr) {
    console.log(stdout); // Hugo output
    console.log(stderr); // Errors
    fetch(err);
  })
});

//----------------------------------------
// CSS
//----------------------------------------

gulp.task('css', function() {
  return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./static/css/'))
    .pipe(browserSync.stream());
});

// TODO: Add combine media queries step (if I add media queries to main.scss)
// ↳ Check if this is necessary because of how Bootstrap handles media queries
gulp.task('css:build', ['css', 'hugo', 'clean:rev'], function() {
  return gulp.src('./static/css/app.css')
  .pipe(uncss({
    html: ['../../public/**/*.html'],
  }))
  .pipe(nano({
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions'],
      add: true,
    },
  }))
  .pipe(rev())
  .pipe(gulp.dest('./static/css/'))
  .pipe(rev.manifest('./rev-manifest.json', { merge: true }))
  .pipe(gulp.dest('.'))
});

//----------------------------------------
// JS
//----------------------------------------

gulp.task('js', function() {
  return gulp.src(['./static/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.stream());
});

gulp.task('js:build', ['js', 'clean:rev'], function() {
  return gulp.src('./static/js/app.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./static/js/'))
    .pipe(rev.manifest('./rev-manifest.json', { merge: true }))
    .pipe(gulp.dest('.'))
});

//----------------------------------------
// HTML
//----------------------------------------

gulp.task('html:build', ['hugo:build'], function() {
  return gulp.src('../../public/**/*.html')
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyJS: true,
      preserveLineBreaks: true,
      quoteCharacter: '"',
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
    }))
    .pipe(gulp.dest('../../public'))
});

gulp.task('html:rev', ['html:build'], function() {
  var manifest = gulp.src('./rev-manifest.json');

  return gulp.src('../../public/**/*.html')
  .pipe(replace({ manifest: manifest }))
  .pipe(gulp.dest('../../public/'));
});

//----------------------------------------
// Misc.
//----------------------------------------

gulp.task('clean:rev', function(){
  return del([
    // Remove old revisioned files
    './static/css/app-*.css',
    './static/js/app-*.js',
  ])
});

gulp.task('clean:build', ['html:rev'], function(){
  return del([
    // Remove development and non-revisioned files
    '../../public/css/maps',
    '../../public/js/maps',
    '../../public/css/app.css',
    '../../public/js/app.js',
    '../../public/js/main.js',
    // Remove blog post drafts
    '../../public/drafts',
    '../../public/drafts.html',
  ], { force:true })
});
