angular.module('doctalkServices', ['ngResource']).

factory('Document', function($resource) {
	return $resource('static/data/:documentId/document.json', {}, {
		query: {
			method: 'GET',
			params: {
				documentId: 'null'
			},
			cache : true,
			isArray: false
		}
	});
}).

factory('Comment', function($resource) {
	return $resource('api/document/:documentId/p:paragraphId/comments', {}, {
		query: {
			method: 'GET',
			params: {
				documentId: 'null',
				paragraphId: 'null'
			},
			cache : false,
			isArray: true
		}
	});
});