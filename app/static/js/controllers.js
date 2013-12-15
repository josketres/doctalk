/**
 * @description
 * This controller shows a document with all of its parts.
 */

function DocumentCtrl($scope, $routeParams, $location, Document, Comment) {

	$scope.documentId = $routeParams.documentId;

	$scope.doc = Document.query({
		documentId: $scope.documentId
	});

	$scope.activatePart = function(partId) {
		$location.path('/' + $scope.documentId + '/p' + partId);
	};
};

/**
 * @description
 * Shows a specific part of the document and allows to view all the other parts of the document.
 */

function PartCtrl($scope, $routeParams, $location, Document, Comment) {

	$scope.documentId = $routeParams.documentId;
	$scope.partId = parseInt($routeParams.partId);
	$scope.visibleParts = [];
	$scope.previousLoaded = $scope.partId < 3;
	$scope.nextLoaded = false;

	function part(id) {
		return {
			active: id == $scope.partId,
			id: id,
			paragraphs: $scope.doc.parts[id - 1].paragraphs
		}
	}

	Document.query({
		documentId: $scope.documentId
	}, function(data) {
		var activePartId = $scope.partId;
		$scope.doc = data;
		$scope.nextLoaded = activePartId == $scope.doc.parts.length;

		if (activePartId > 1) {
			$scope.visibleParts.push(part($scope.partId - 1));
		}

		$scope.visibleParts.push(part($scope.partId));

		if (activePartId < data.parts.length) {
			$scope.visibleParts.push(part($scope.partId + 1));
		}
	});

	$scope.activatePart = function(partId) {
		$location.path('/' + $scope.documentId + '/p' + partId);
	};

	$scope.loadPreviousParts = function() {
		var i, previous = [];
		for (i = 1; i < $scope.partId - 1; ++i) {
			previous.push(part(i));
		}
		$scope.visibleParts = previous.concat($scope.visibleParts);
		$scope.previousLoaded = true;
	};

	$scope.loadNextParts = function() {
		var i, next = [];
		for (i = $scope.partId + 1; i <= $scope.doc.parts.length; ++i) {
			next.push(part(i));
		}
		$scope.visibleParts = $scope.visibleParts.concat(previous);
		$scope.nextLoaded = true;
	};
};