const browserSync = require('browser-sync').create();
const cleanCSS    = require('gulp-clean-css');
const del         = require('del');
const exec        = require('child_process').exec;
const flexFixes   = require('postcss-flexbugs-fixes');
const gulp        = require('gulp');
const htmlmin     = require('gulp-htmlmin');
const imagemin    = require('gulp-imagemin');
const mozjpeg     = require('imagemin-mozjpeg');
const postcss     = require('gulp-postcss');
const prefixer    = require('autoprefixer');
const replace     = require('gulp-rev-replace');
const responsive  = require('gulp-responsive');
const rev         = require('gulp-rev');
const sass        = require('gulp-sass');
const sourcemaps  = require('gulp-sourcemaps');
const uncss       = require('gulp-uncss');

const paths = {
  public: {
    root: '../../public',
    html: '../../public/**/*.html',
  },
  sass: {
    src: './sass/**/*.scss',
    main: './sass/app.scss',
    dest: '../../public/css/',
    static: '../../public/css/app.css',
  },
  img: {
    src: '../../static/img/original/*',
    dest: '../../public/img',
  },
  config: '../../config.toml',
  content: '../../content/**/*.md',
  layouts: './layouts/**/*.html',
  maps: './maps',
  manifest: './rev-manifest.json',
};

gulp.task('default', ['watch']);
gulp.task('watch', ['serve']);
gulp.task('build', ['clean:build']);
gulp.task('clean', ['clean:public']);

//----------------------------------------
// Browser Sync
//----------------------------------------

gulp.task('serve', ['hugo', 'css', 'img'], function() {
  browserSync.init({
    server: paths.public.root,
    reloadDelay: 200, // Give hugo a moment to generate pages
    // notify: false, // Disable Browsersync notification
    // online: false, // Uncomment if no internet connection
  });

  gulp.watch(paths.sass.src, ['css']);
  gulp.watch(paths.img.src, ['img']);
  gulp.watch([paths.content, paths.layouts, paths.config], ['hugo']);
  gulp.watch(paths.public.html).on('change', browserSync.reload);
});

//----------------------------------------
// Hugo
//----------------------------------------

gulp.task('hugo', function(cb) {
  exec('hugo -s ../../ --buildDrafts --baseUrl="http://localhost:3000/"', function(err, stdout, stderr) {
    console.log(stdout);   // Hugo output
    console.error(stderr); // Errors
    cb(err);
  });
});

gulp.task('hugo:build', ['css:build', 'img:build'], function(cb) {
  exec('hugo -s ../../', function(err, stdout, stderr) {
    console.log(stdout);   // Hugo output
    console.error(stderr); // Errors
    cb(err);
  });
});

//----------------------------------------
// CSS
//----------------------------------------

gulp.task('css', function() {
  return gulp.src(paths.sass.main)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write(paths.maps))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('css:build', ['css', 'hugo', 'clean:rev'], function() {
  return gulp.src(paths.sass.static)
  .pipe(uncss({ html: [paths.public.html] }))
  .pipe(postcss([
    flexFixes(),
    prefixer({
      browsers: ['> 1%', 'last 2 versions'],
      add: true,
    }),
  ]))
  .pipe(cleanCSS({
    keepSpecialComments: 0,
  }))
  .pipe(rev())
  .pipe(gulp.dest(paths.sass.dest))
  .pipe(rev.manifest(paths.manifest, { merge: true }))
  .pipe(gulp.dest('.'));
});

//----------------------------------------
// Images
//----------------------------------------

gulp.task('img', function() {
  return gulp.src([paths.img.src])
    // Resize images (use with <img> shortcode in hugo)
    .pipe(responsive({
      '*': [{
        width: 546,
        rename: { suffix: '-sm' },
      }, {
        width: 546 * 2,
        rename: { suffix: '-sm@2x' },
      }, {
        width: 546 * 3,
        rename: { suffix: '-sm@3x' },
      }, {
        width: 675,
      }, {
        width: 675 * 2,
        rename: { suffix: '@2x' },
      }, {
        width: 675 * 3,
        rename: { suffix: '@3x' },
      }],
    }, {
      silent: true,              // Don't spam the console
      withoutEnlargement: false, // Allow image enlargement
    }))
    .pipe(gulp.dest(paths.img.dest));
});

gulp.task('img:build', ['img'], function() {
  return gulp.src(['${paths.img.dest}/*.{jpg,png,gif,svg}'])
    // Optimise images
    .pipe(imagemin([
      // imagemin.gifsicle(), // Uncomment for gif support
      imagemin.optipng(),
      // imagemin.svgo(),     // Uncomment for svg support
      mozjpeg(),
    ]))
    .pipe(gulp.dest(paths.img.dest));
});

//----------------------------------------
// HTML
//----------------------------------------

gulp.task('html:build', ['hugo:build'], function() {
  return gulp.src(paths.public.html)
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      preserveLineBreaks: true,
      quoteCharacter: '"',
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
    }))
    .pipe(gulp.dest(paths.public.root));
});

gulp.task('html:rev', ['html:build'], function() {
  const manifest = gulp.src(paths.manifest);

  return gulp.src(paths.public.html)
  .pipe(replace({ manifest }))
  .pipe(gulp.dest(paths.public.root));
});

//----------------------------------------
// Misc.
//----------------------------------------

gulp.task('clean:rev', function() {
  return del([
    // Remove old revisioned files
    '${paths.sass.dest}/app-*.css',
  ]);
});

gulp.task('clean:build', ['html:rev'], function() {
  return del([
    // Remove development and non-revisioned files
    '${paths.public.root}/css/maps',
    '${paths.public.root}/css/app.css',
    // Remove original unoptimised images
    '${paths.public.root}/img/original',
    // Remove blog post drafts
    '${paths.public.root}/drafts',
    '${paths.public.root}/drafts.html',
    // Remove unnecessary hugo generated file
    '${paths.public.root}/.html',
  ], { force: true });
});

gulp.task('clean:public', function() {
  return del([
    // Remove entire public directory contents
    '${paths.public.root}/*',
    '${paths.public.root}/.*',
  ], { force: true });
});
