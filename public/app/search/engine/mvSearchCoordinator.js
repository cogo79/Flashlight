const NO_MORE_PAGES = 'NO_MORE_PAGES';

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
		},
		nextPage: function() {
			console.log("nextPage()");
			mvSearchFlickr.nextPage().then(function(results) {
				
				pages.push(results);

			}, function(error) {

				if (error = NO_MORE_PAGES) {
					// screw it!
				}

			})
		}
	};
}]);