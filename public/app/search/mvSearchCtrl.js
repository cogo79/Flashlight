angular.module('app').controller('mvSearchCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	$scope.pages = mvSearchCoordinator.searchResults();
}]);