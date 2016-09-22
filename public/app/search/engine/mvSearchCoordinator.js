
angular.module('app').factory('mvSearchCoordinator', ['mvSearchFlickr', function(mvSearchFlickr) {
	var pages = [];
	return {
		newSearch: function(word) {
			mvSearchFlickr.newSearch(word).then(function(results) {
				pages = [];
				pages.push(results);
				
			}, function(error) {

			});
		},
		searchResults: function() {
			return pages;
		}
	};
}]);