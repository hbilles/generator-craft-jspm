'use strict';

var gulp = require('gulp'),
	path = require('path'),
	util = require('gulp-util');

function logChanges(event) {
	util.log(
		util.colors.green('File ' + event.type + ': ') +
		util.colors.magenta(path.basename(event.path))
	);
}

module.exports = logChanges;