angular.module('app')
.controller('mvSearchFieldCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	
	$scope.search = function() {
		if ($scope.searchText) {
			mvSearchCoordinator.newSearch($scope.searchText);
			$('search-field center > .container > input').blur();
		}
	}

	$('search-field center > .container > input').keyup(function(event){
	    if(event.keyCode == 13){
	        $scope.search();
	    }
	});
}])
.directive('searchField', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/searchField'
	};
});