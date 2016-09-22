
angular.module('app').factory('mvSearchCoordinator', ['mvSearchFlickr', function(mvSearchFlickr) {
	var pages = [];
	return {
		searchFor: function(word) {
			mvSearchFlickr.searchFor(word).then(function(results) {
				pages.push(results);
			}, function(error) {
				
			});
		},
		searchResults: function() {
			return pages;
		}
	};
}]);