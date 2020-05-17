
var root = './';
var devFiles = 'prototype'; // directory where the dev files are contained
var prodFiles = 'dist'; // directory of production ready files

// File names
var fileNames = {
  css: 'main.min.css',             // The main CSS file (which includes your CSS + libraries)
  customJs: 'main.js',             // JS file containing your custom JS with modules
  jsLibraries: 'libraries.min.js', // All of the JS libraries combined into one, minified
};

// Modify the file paths here if needed
var src = {
  sassSrc:  root + devFiles + '/_sass/**/*.scss',       // location of all SCSS source files
  sassDest: root + devFiles + '/_css',                  // location where the SCSS files will be compiled into 1 CSS file
  cssSrc:   root + devFiles + '/_css/**/*.css',         // location of all CSS files
  cssDest:  root + prodFiles + '/css',                  // location where the production CSS file will be placed
  imgSrc:   root + devFiles + '/_img/**/*',             // location of all unoptimized images
  imgDest:  root + prodFiles + '/images',               // location of where the optimized images will be placed
  jsWatch:  root + devFiles + '/_js/**/*.js',           // location of all JS files which will be watched for page reloads
  jsSrc:    root + devFiles + '/_js/main.js',           // location of the main JS file which includes all modules
  jsLib:    root + devFiles + '/_js/libraries/**/*.js', // location of all the JS libraries you use (like jQuery)
  jsDest:   root + prodFiles + '/js',                   // location of where the production ready JS files will be placed
  php:      root + '**/*.php',                          // location of all PHP files which will be watched for page reloads
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
    .pipe(concat(fileNames.css))
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
    .pipe(source(fileNames.customJs))
    // Start piping stream to tasks!
    .pipe(gulp.dest(src.jsDest));
});

// Combine all js libraries located in JS source folder/libraries
gulp.task('combineJsLibraries', function() {
  return gulp.src(src.jsLib)
    .pipe(concat(fileNames.jsLibraries))
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
