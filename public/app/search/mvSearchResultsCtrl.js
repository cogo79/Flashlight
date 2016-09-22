angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	}
}]);