'use strict';

// general
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

// javascript
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gutil = require('gutil');

//////////////////////////////////////////////////
// Variables
//////////////////////////////////////////////////
var sourceDir = 'client';
var destDir = 'public';

var config = {
  viewsSrcDir: sourceDir + '/views'
};
//////////////////////////////////////////////////
// Base Tasks
//////////////////////////////////////////////////

gulp.task('default', ['build']);

gulp.task('build', function () {
  runSequence('clean', ['scripts', 'views']);
});

//////////////////////////////////////////////////
// Task Details
//////////////////////////////////////////////////

gulp.task('clean', del.bind(null, [destDir]));

gulp.task('scripts', function () {

  webpack(webpackConfig, function(err, stats) {
    if(err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
  });

});

gulp.task('views', function () {
  gulp
    .src([config.viewsSrcDir + '/**/*.*'])
    .pipe(gulp.dest(destDir + '/views'));
});
