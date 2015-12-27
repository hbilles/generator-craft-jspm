'use strict';

var gulp = require('gulp'),
	server = require('browser-sync');

// Start a server with BrowserSync to preview the site in
gulp.task('server', function() {
	server.init({
		proxy: global.vars.devUrl
	});
});

module.exports = server;
