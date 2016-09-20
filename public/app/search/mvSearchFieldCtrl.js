angular.module('app')
.controller('mvSearchFieldCtrl', ['$scope', function($scope) {
	
}])
.directive('searchField', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/searchField'
	};
});