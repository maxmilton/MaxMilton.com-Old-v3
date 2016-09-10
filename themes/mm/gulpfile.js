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
var uglify      = require('gulp-uglify');
var combineMq   = require('gulp-combine-mq');
var uncss       = require('gulp-uncss');

var paths = {
  public: {
    root: '../../public',
    html: '../../public/**/*.html',
  },
  sass: {
    src: './sass/**/*.scss',
    main: './sass/main.scss',
    dest: '../../public/css/',
    static: '../../public/css/app.css',
  },
  js: {
    src: './static/js/**/*.js',
    main: './static/js/main.js',
    dest: '../../public/js',
    static: '../../public/js/app.js',
  },
  config: '../../config.toml',
  content: '../../content/**/*.md',
  layouts: './layouts/**/*.html',
  maps: './maps',
  manifest: './rev-manifest.json',
};

gulp.task('default', ['watch']);
gulp.task('watch', ['serve']);
gulp.task('build', ['css:build', 'js:build', 'html:build', 'html:rev', 'clean:build']);
gulp.task('clean', ['clean:public']);

//----------------------------------------
// Browser Sync
//----------------------------------------

gulp.task('serve', ['hugo', 'css', 'js'], function() {
  browserSync.init({
    server: paths.public.root,
    reloadDelay: 200,     // Give hugo a moment to generate pages
    // notify: false, // Disable Browsersync notification
    // online: false, // Uncomment if no internet connection
  });

  gulp.watch(paths.sass.src, ['css']);
  gulp.watch(paths.js.src, ['js']);
  gulp.watch([paths.content, paths.layouts, paths.config], ['hugo']);
  gulp.watch([paths.public.html]).on('change', browserSync.reload);
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
  return gulp.src(paths.sass.main)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(sourcemaps.write(paths.maps))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css:build', ['css', 'hugo', 'clean:rev'], function() {
  return gulp.src(paths.sass.static)
  .pipe(combineMq({
    beautify: false,
  }))
  .pipe(uncss({
    html: [paths.public.html],
  }))
  .pipe(nano({
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions'],
      add: true,
    },
    discardComments: {
      removeAll: true,
    },
  }))
  .pipe(rev())
  .pipe(gulp.dest(paths.sass.dest))
  .pipe(rev.manifest(paths.manifest, { merge: true }))
  .pipe(gulp.dest('.'))
});

//----------------------------------------
// JS
//----------------------------------------

gulp.task('js', function() {
  return gulp.src([paths.js.main])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write(paths.maps))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('js:build', ['js', 'clean:rev'], function() {
  return gulp.src(paths.js.static)
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(rev.manifest(paths.manifest, { merge: true }))
    .pipe(gulp.dest('.'))
});

//----------------------------------------
// HTML
//----------------------------------------

gulp.task('html:build', ['hugo:build'], function() {
  return gulp.src(paths.public.html)
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
    .pipe(gulp.dest(paths.public.root))
});

gulp.task('html:rev', ['html:build'], function() {
  var manifest = gulp.src(paths.manifest);

  return gulp.src(paths.public.html)
  .pipe(replace({ manifest: manifest }))
  .pipe(gulp.dest(paths.public.root));
});

//----------------------------------------
// Misc.
//----------------------------------------

gulp.task('clean:rev', function(){
  return del([
    // Remove old revisioned files
    paths.sass.dest + '/app-*.css',
    paths.js.dest + '/app-*.js',
  ])
});

gulp.task('clean:build', ['html:rev'], function(){
  return del([
    // Remove development and non-revisioned files
    paths.public.root + '/css/maps',
    paths.public.root + '/css/app.css',
    paths.public.root + '/js/maps',
    paths.public.root + '/js/app.js',
    paths.public.root + '/js/main.js',
    // Remove blog post drafts
    paths.public.root + '/drafts',
    paths.public.root + '/drafts.html',
    // Remove unnecessary hugo generated file
    paths.public.root + '/.html',
  ], { force:true })
});

gulp.task('clean:public', function(){
  return del([
    // Remove entire public directory contents
    paths.public.root + '/*',
    paths.public.root + '/.*',
  ], { force:true })
});
