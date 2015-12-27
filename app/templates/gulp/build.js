'use strict';

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	exec = require('child_process').execSync,
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	replace = require('gulp-replace'),
	runSeq = require('run-sequence'),
	sass = require('gulp-sass');

// One build task to rule them all.
gulp.task('build', function(done) {
	runSeq('clean', ['buildSass', 'buildJs'], 'buildHtml', done);
});

// Build SASS for distribution.
gulp.task('buildSass', function() {
	gulp.src(global.paths.sassEntry)
		.pipe(sass({ includePaths: global.paths.sassDeps }).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: global.vars.compatibility }))
		.pipe(minifyCss())
		.pipe(gulp.dest(global.paths.css));
});

// Build JS for distribution.
gulp.task('buildJs', function() {
	exec('npm run buildJs', function(err, stdout, stderr) {
		if (err) {
			throw err;
		}
		else {
			console.log('Build complete!');
		}
	});
});

// Build HTML for distribution.
gulp.task('buildHtml', function() {
	gulp.src(global.paths.twig)
		.pipe(replace('jspm_packages/system.js', 'dist/build/js/app.min.js'))
		.pipe(replace('<script src="config.js"></script>', ''))
		.pipe(replace("<script>System.import('src/js/app.js');</script>", ''))
		.pipe(minifyHtml())
		.pipe(gulp.dest(global.paths.html));
});
