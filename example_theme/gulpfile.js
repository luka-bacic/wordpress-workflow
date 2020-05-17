
var root = './';
var devFiles = 'assets'; // directory where the dev files are contained
var prodFiles = 'dist'; // directory of production ready files

// Modify the file paths here if needed
var src = {
  sassSrc: root + devFiles + '/_sass/**/*.scss',
  sassDest:  root + devFiles + '/_css',
  cssSrc: root + devFiles + '/_css/**/*.css',
  cssDest: root + prodFiles + '/css',
  imgSrc: root + devFiles + '/_img/**/*',
  imgDest: root + prodFiles + '/images',
  jsWatch:   root + devFiles + '/_js/**/*.js',
  jsSrc: root + devFiles + '/_js/main.js',
  jsLib: root + devFiles + '/_js/libraries/**/*.js',
  jsDest:  root + prodFiles + '/js',
  php:  root + '**/*.php',
};

// Don't touch these
var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    reload       = browserSync.reload,
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
    babel        = require('gulp-babel'),
    browserify   = require('browserify'),
    source       = require('vinyl-source-stream'),
    babelify     = require('babelify'),
    concat       = require('gulp-concat'),
    cleanCSS     = require('gulp-clean-css');

// Compile sass into CSS and spit out a file at sass destination
gulp.task('sass', function() {
  return gulp.src(src.sassSrc)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(src.sassDest))
    .pipe(reload({stream: true}));
});

// Combine all CSS files in the CSS source folder and minify it
// 
// you don't have to use this, but its faster to serve 1 massive css file, instead of 
// a bunch of css files (for which a HTTP request is called - lower site loading speed and SEO)
gulp.task('combineCss', function() {
  return gulp.src(src.cssSrc)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('all-css.min.css'))
    .pipe(gulp.dest(src.cssDest));
});

// Optimize all images in image source folder and spit them out at image production folder
gulp.task('images', function() {
  return gulp.src(src.imgSrc)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 6}),
    ]))
    .pipe(gulp.dest(src.imgDest));
});

// browserify and transpile ES6 code to ES5
gulp.task('browserify', function() {
  return browserify(src.jsSrc)
    .transform(babelify.configure({
      presets: ["@babel/preset-env"]
    }))
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest(src.jsDest));
});

// Combine all js libraries located in JS source folder/libraries
gulp.task('combineJsLibraries', function() {
  return gulp.src(src.jsLib)
    .pipe(concat('libraries.min.js'))
    .pipe(gulp.dest(src.jsDest))
});

// watch task, ran with `gulp` 
gulp.task('serve', gulp.series(['sass', 'combineCss', 'images', 'browserify', 'combineJsLibraries'], function() {
  browserSync.init({
    proxy: 'http://127.0.0.1:8080/ving/sr/'
  });

  gulp.watch(src.sassSrc, gulp.series('sass'));
  gulp.watch(src.cssSrc, gulp.series('combineCss'))
  gulp.watch(src.imgSrc, gulp.series('images'));
  gulp.watch(src.jsLib, gulp.series('combineJsLibraries'));
  gulp.watch(src.jsWatch).on('change', reload);
  gulp.watch(src.php).on('change', reload);
}));


// run `gulp` in the terminal
gulp.task('default', gulp.series(['serve']));
