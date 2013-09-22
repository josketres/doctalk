function DocumentCtrl($scope, Document, Comment) {

	$scope.activeParagraph = {
		id: -1,
		comments: [],
		isActive: function() {
			return this.id != -1;
		}
	};

	$scope.doc = Document.query({
		documentId: 'reforma-educativa'
	});

	$scope.activateParagraph = function(paragraphNumber) {
		$scope.activeParagraph.comments = Comment.query({
			documentId: 'reforma-educativa',
			paragraphId: paragraphNumber
		});
		$scope.activeParagraph.id = paragraphNumber;
	};

	$scope.addComment = function() {
		var newComment = new Comment();
		newComment.user = $scope.commenterName;
		newComment.comment = $scope.comment;
		newComment.$save({
			documentId: 'reforma-educativa',
			paragraphId: $scope.activeParagraph.id
		});
		$scope.activateParagraph($scope.activeParagraph.id);
	};
};