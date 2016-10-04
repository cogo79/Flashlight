const NO_MORE_PAGES = 'NO_MORE_PAGES';

angular.module('app').factory('mvSearchCoordinator', ['mvSearchFlickr', 'mvEvents', function(mvSearchFlickr, mvEvents) {
	var pages = [];
	var _searchString;
	return {
		newSearch: function(searchString) {
			mvSearchFlickr.newSearch(searchString).then(function(results) {
				mvEvents.newSearchSucceeded();
				_searchString = searchString;
				pages = [];
				pages.push(results);
			}, function(error) {
				
			});
		},
		searchResults: function() {
			return pages;
		},
		nextPage: function() {
			if (_searchString) {
				mvSearchFlickr.nextPage().then(function(results) {
					
					pages.push(results);

				}, function(error) {

					if (error = NO_MORE_PAGES) {
						// screw it!
					}

				})
			}
		},
		getAdditionalMetaData: function(image) {
			if (image.from.FLICKR = FLICKR) {
				return mvSearchFlickr.getInfo(image.meta.id);
			}
		}
	};
}]);