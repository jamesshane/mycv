/// <binding BeforeBuild='default' Clean='clean' />
"use strict";

var gulp = require("gulp"),
  browserify = require("browserify"),
  tsify = require("tsify"),
  source = require("vinyl-source-stream"),
  uglify = require("gulp-terser"),
  sourcemaps = require("gulp-sourcemaps"),
  buffer = require("vinyl-buffer"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  merge = require("merge-stream"),
  glob = require("glob"),
  sass = require("gulp-sass");

sass.compiler = require("node-sass");

var paths = {
  webroot: "./public/",
  srcroot: "./src/mycv/"
};

paths.jssrc = paths.srcroot + "js/*.js";
paths.jsdest = paths.webroot + "js";

paths.tssrc = paths.srcroot + "ts/*.ts";
paths.tsdest = paths.webroot + "js";

paths.htmlsrc = paths.srcroot + "html/*.html";
paths.htmldest = paths.webroot + "";

paths.imgsrc = paths.srcroot + "img/*.*";
paths.imgdest = paths.webroot + "img";

paths.csssrc = paths.srcroot + "css/*.css";
paths.cssdest = paths.webroot + "css";

paths.scsssrc = paths.srcroot + "scss/*.scss";
paths.scssdest = paths.webroot + "css";

gulp.task("html-copy", function() {
  return gulp.src(paths.htmlsrc).pipe(gulp.dest(paths.htmldest));
});

gulp.task("css-copy", function() {
  return gulp.src(paths.csssrc).pipe(gulp.dest(paths.cssdest));
});

gulp.task("img-copy", function() {
  return gulp.src(paths.imgsrc).pipe(gulp.dest(paths.imgdest));
});

gulp.task("js-copy", function() {
  return gulp
    .src(paths.jssrc)
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.jsdest));
});

gulp.task("ts-copy", function() {
  var files = glob.sync(paths.tssrc);
  return merge(
    files.map(function(file) {
      return browserify({
        basedir: ".",
        debug: true,
        entries: file,
        cache: {},
        packageCache: {}
      })
        .plugin(tsify, { noImplicitAny: true })
        .bundle()
        .pipe(source("APIClasses.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("./"))
        .on("error", function(error) {
          console.error(error.toString());
        })
        .pipe(gulp.dest(paths.tsdest));
    })
  );
});

gulp.task("scss-copy", function() {
  return gulp
    .src(paths.scsssrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.scssdest));
});

gulp.task("default", [
  "ts-copy",
  "html-copy",
  "js-copy",
  "css-copy",
  "img-copy",
  "scss-copy"
]);

// watch the files for changes and rebuild everything
gulp.task("watchts", function() {
  gulp.watch(paths.tssrc, ["ts-copy"]);
});

gulp.task("watchhtml", function() {
  gulp.watch(paths.htmlsrc, ["html-copy"]);
});

gulp.task("watchjs", function() {
  gulp.watch(paths.jssrc, ["js-copy"]);
});

gulp.task("watchimg", function() {
  gulp.watch(paths.imgsrc, ["img-copy"]);
});

gulp.task("watchcss", function() {
  gulp.watch(paths.csssrc, ["css-copy"]);
});

gulp.task("watchscss", function() {
  gulp.watch(paths.scsssrc, ["scss-copy"]);
});

gulp.task("watch", [
  "watchts",
  "watchhtml",
  "watchjs",
  "watchcss",
  "watchimg",
  "watchscss"
]);

var pdfMaker = require('pdf-maker');
 
var template = './src/mycv/html/index.html';
var pdfPath = './public/JamesShaneCV.pdf';
var option =
{
  paperSize: {
    format: 'A4',
    orientation: 'portrait',
    border: '1.8cm'
  }
};
 
gulp.task("make-pdf",function () {
  pdfMaker(template, pdfPath, option);
});
