angular.module('app')
.controller('mvSearchFieldCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	
	$scope.search = function() {
		console.log($scope.searchText);
		mvSearchCoordinator.newSearch($scope.searchText);
	}
}])
.directive('searchField', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/searchField'
	};
});