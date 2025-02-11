"use strict";

// Project Specific Variables
const projectPath = './';
const devPath = projectPath + '_dev';
const buildPath = projectPath + 'assets';
const projectURL = projectPath + './_site';

// npm packages
const fs = require('fs');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const cp = require("child_process");
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const path = require('path');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const { exec } = require('child_process');

// Determine the environment and set the bundle path
const isWindows = process.platform === 'win32';
const bundlePath = isWindows ? 'C:/Ruby30-x64/bin/bundle' : 'bundle';

// Local scripts
const buildThanksData = require('./script/thanks');

const browsersync = require("browser-sync").create();
const del = require("del");
const $ = gulpLoadPlugins();

// BrowserSync
function browserSync() {
  console.log('browser sync');
  browsersync.init({
    server: {
      baseDir: "./_site/"
    },
    open: false,
    injectChanges: true,
    port: 3000,
    files: [buildPath + '/css/*.css', buildPath + '/js/*.js', projectPath + '*.html']
  });
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// Compile CSS
function css() {
  console.log('Compiling CSS...');
  return gulp
    .src([devPath + '/scss/compile.scss'])
    .pipe(rename({ basename: "index" }))
    .pipe(sass({ includePaths: ['node_modules/'] }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./assets/css/"))
    .pipe(browsersync.stream());
}

// Build thanks data
// function thanks(done) {
//   console.log('Building thanks data...');
//   const yaml = buildThanksData();
//   const file = path.join(__dirname, '_data', 'dependencies.yml');
//   fs.writeFileSync(file, yaml);
//   return done();
// }

function thanks(done) {
	console.log('Building thanks data...');
	try {
	  const yaml = buildThanksData();
	  const file = path.join(__dirname, '_data', 'dependencies.yml');
	  fs.writeFileSync(file, yaml);
	  done();
	} catch (err) {
	  console.error('Error building thanks data:', err);
	  done(err);
	}
  }

// Compile JS
function js() {
  console.log('Compiling JS...');
  var scriptsToConcat = [
    devPath + '/js/main.js'
  ];
  return gulp
    .src(scriptsToConcat)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js/"))
    .pipe(browsersync.stream());
}

// Copy JS from npm
function jsFromNpm() {
  return gulp
    .src([
      'node_modules/gsap/dist/gsap.min.js',
      'node_modules/timeago/jquery.timeago.js',
    ])
    .pipe(gulp.dest("./assets/js/"));
}

// Optimize images
function images() {
  return gulp
    .src([devPath + '/images/**/*.{png,jpg,gif,ico,svg}'])
    .pipe(newer(buildPath + '/images/'))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(buildPath + '/images/'));
}

// Jekyll build
function jekyll(cb) {
  exec(`${bundlePath} exec jekyll build`, function (err, stdout, stderr, thanks) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

// Watch files
// function watchFiles(cb) {
//   css();
//   js();
//   jekyll(() => {
//     console.log('watching...');
//     gulp.watch(
//       ["./_dev/scss/**/*"],
//       gulp.series(css, jekyll)
//     );
//     gulp.watch(
//       ["./_dev/js/main.js"],
//       gulp.series(js, jekyll, browserSyncReload)
//     );
//     gulp.watch(
//       [
//         "./_includes/**/*",
//         "./_layouts/**/*",
//         "./_pages/**/*",
//         "./_posts/**/*",
//         "./_projects/**/*"
//       ],
//       gulp.series(jekyll, browserSyncReload)
//     );
//     gulp.watch("./assets/img/**/*", images);
//     cb();
//   });
// }
function watchFiles(cb) {
	gulp.watch('./_dev/scss/**/*', gulp.series(css, jekyll, browserSyncReload));
	gulp.watch('./_dev/js/main.js', gulp.series(js, jekyll, browserSyncReload));
	gulp.watch(
	  [
		"./_includes/**/*",
		"./_layouts/**/*",
		"./_pages/**/*",
		"./_posts/**/*",
		"./_projects/**/*"
	  ],
	  gulp.series(jekyll, browserSyncReload)
	);
	gulp.watch("./assets/img/**/*", images);
	cb();
}
// Build task
const build = gulp.series(clean, jsFromNpm, css, js);

// Watch task
const watch = gulp.parallel(watchFiles, browserSync);

// Default task
gulp.task('default', watch);

// Build task
gulp.task('build', build);

// Exports
exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.clean = clean;
exports.watch = watch;
exports.watchFiles = watchFiles;
exports.jsFromNpm = jsFromNpm;
exports.thanks = thanks;