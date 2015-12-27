'use strict';

var gulp = require('gulp'),
	cache = require('gulp-cached'),
	eslint = require('gulp-eslint'),
	scsslint = require('gulp-scss-lint');

// Lint JS.
gulp.task('lintJs', function () {
	return gulp.src(global.paths.js)
		.pipe(cache('lintJs'))
		.pipe(eslint({
			env: {
				'browser': true,
				'node': true,
				'es6': true
			},
			ecmaFeatures: {
				'modules': true
			},
			rules: {
				'camelcase': [2, {'properties': 'always'}],
				'eqeqeq': [2, 'smart'],
				'indent': [2, 'tab'],
				'new-cap': 2,
				'quotes': [2, 'single'],
				'no-undef': 2,
				'no-unused-vars': 2,
				'strict': [2, 'global'],
				'no-trailing-spaces': [2, { 'skipBlankLines': true }]
			}
		}))
		.pipe(eslint.format());
});

// Lint SASS.
gulp.task('lintSass', function () {
	return gulp.src(global.paths.sass)
		.pipe(cache('lintSass'))
		.pipe(scsslint());
});

// Lint all the things!
gulp.task('lint', ['lintJs', 'lintSass']);
