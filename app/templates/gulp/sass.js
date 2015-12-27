'use strict';

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	server = require('./server');

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded',
	includePaths: global.paths.sassDeps
};

var autoprefixerOptions = {
	browsers: global.vars.compatibility
};

gulp.task('sass', function() {
	return gulp.src(global.paths.sassEntry)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(global.paths.css))
		.pipe(server.reload({ stream:true }));
});