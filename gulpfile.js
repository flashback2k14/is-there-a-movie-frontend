// imports
var del = require("del");
var exec = require('child_process').exec;
var gulp = require("gulp");
var ghPages = require("gulp-gh-pages");
var gRun = require("gulp-run");
var merge = require("merge-stream");
var vulcanize = require('gulp-vulcanize');

// delete build and dist folder
gulp.task("clean", function() {
  return del.sync(["build", "dist", "output", ".publish"]);
});

gulp.task("clean-output", function() {
  return del.sync("output");
})

// lint application
gulp.task("lint", ["clean-output"], function() {
  return gRun("polymer lint", {
      verbosity: 0
    })
    .exec()
    .pipe(gulp.dest("output/lint"));
});

// build application
gulp.task("build", ["clean", "lint"], function() {
  return gRun("polymer build --entrypoint app/index.html", {
      verbosity: 0
    })
    .exec()
    .pipe(gulp.dest("output/build"));
});

// vulcanize application
gulp.task("vulcanize", function() {
  return gulp.src("./app/elements/elements.html")
    .pipe(vulcanize())
    .pipe(gulp.dest("dist/elements"));
});

// copy application to dist
gulp.task("copy", ["build"], function() {
  // copy app to dist/app
  var app = gulp.src([
      "./build/bundled/app/**/*"
    ])
    .pipe(gulp.dest("dist/app"));
  //copy config to dist
  var config = gulp.src([
      "./build/bundled/polymer.json",
      "./build/bundled/service-worker.js",
      "./build/bundled/sw-precache-config.js"
    ])
    .pipe(gulp.dest("dist"));
  // merge streams
  return merge(app, config);
});

// deploy dist to gh-pages
gulp.task("deploy", ["copy"], function() {
  return gulp.src("./dist/**/*")
    .pipe(ghPages());
});

// serve application
gulp.task("serve", ["clean-output"], function() {
  return gRun("polymer serve -o -p 8088", {
      verbosity: 0
    })
    .exec()
    .pipe(gulp.dest("output/serve"));
});

// serve bundled application
gulp.task("serve-bundled", ["clean-output"], function() {
  return gRun("cd build/bundled/ && npm run serve", {
      verbosity: 0
    })
    .exec()
    .pipe(gulp.dest("output/serve"));
});

// serve bundled application
gulp.task("serve-unbundled", ["clean-output"], function() {
  return gRun("cd build/unbundled/ && npm run serve", {
      verbosity: 0
    })
    .exec()
    .pipe(gulp.dest("output/serve"));
});

// test application
gulp.task("test", ["clean-output"], function() {
  return gRun("polymer test", {
      verbosity: 2
    })
    .exec()
    .pipe(gulp.dest("output/test"));
});

// test application --> skip selenium install
gulp.task("test-skip", ["clean-output"], function() {
  return gRun("polymer test --skip-selenium-install", {
      verbosity: 2
    })
    .exec()
    .pipe(gulp.dest("output/test"));
});