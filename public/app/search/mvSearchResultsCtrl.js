angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	};

	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			// User scrolled to bottom
			mvSearchCoordinator.nextPage();
		}
	});
}]);