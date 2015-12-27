'use strict';

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp'),
	requireDir = require('require-dir'),
	server = require('./gulp/server'),
	logChanges = require('./gulp/logChanges');

// Development URL
var DEVURL = 'http://<%= domainName %>.dev'

// Specify paths & globbing patterns for tasks.
global.paths = {
	// Twig sources.
	'twig': './public/src/templates/**/*.twig',
	// JS sources.
	'js': './public/src/js/**/*.js',
	// SASS Dependencies
	sassDeps: [
		'./node_modules/bourbon/app/assets/stylesheets',
		'./node_modules/bourbon-neat/app/assets/stylesheets'
	],
	// SASS sources.
	'sass': './public/src/scss/**/*.scss',
	// SASS Entry point
	'sassEntry': './public/src/scss/styles.scss',
	// Sources folder.
	'src': './public/src',
	// Production HTML folder
	'html': './public/dist/build/templates',
	// Compiled CSS folder.
	'css': './public/dist/build/css',
	// Build folder.
	'build': './public/dist/build'
};

// Specify variables
global.vars = {
	// Development URL
	'devUrl': DEVURL,
	'compatibility': [
		'last 2 versions',
		'ie >= 10'
	]
}

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse: false });

// Build the site, run the server, and watch for file changes
gulp.task('default', ['sass', 'server'], function() {
	gulp.watch(global.paths.sass, ['lintSass', 'sass']).on('change', logChanges);
	gulp.watch(global.paths.js, ['lintJs', 'js']).on('change', logChanges);
	gulp.watch(global.paths.twig, ['html']).on('change', logChanges);
});
