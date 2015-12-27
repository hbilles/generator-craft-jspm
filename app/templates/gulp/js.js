'use strict';

var gulp = require('gulp'),
	cache = require('gulp-cached'),
	server = require('./server');

gulp.task('js', function() {
	return gulp.src(global.paths.js)
		.pipe(cache('scripts'))
		.pipe(server.reload({ stream:true }));
});