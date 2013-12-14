module.exports = function(config) {
	config.set({
		basePath: '../',

		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-*/angular-*.js',
			'static/js/**/*.js',
			'test/unit/**/*.js'
		],

		exclude: [
			'bower_components/**/*.min.js',
			'bower_components/angular-scenario/angular-scenario.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		plugins: [
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
};