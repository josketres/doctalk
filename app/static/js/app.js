var app = angular.module('doctalk', ['doctalkServices', 'ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/:documentId', {
			templateUrl: 'static/partials/document.html',
			controller: 'DocumentCtrl'
		}).		
		when('/:documentId/p:partId', {
			templateUrl: 'static/partials/part.html',
			controller: 'PartCtrl'
		}).
		otherwise({
			templateUrl: 'static/partials/home.html',
			controller: 'HomeCtrl'
		})	
		;
	}
]);