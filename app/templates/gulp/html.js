'use strict';

var gulp = require('gulp'),
	cache = require('gulp-cached'),
	server = require('./server');

gulp.task('html', function() {
	return gulp.src(global.paths.twig)
		.pipe(cache('html'))
		.pipe(server.reload({ stream:true }));
});