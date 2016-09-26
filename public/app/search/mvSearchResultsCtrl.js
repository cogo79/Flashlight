angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	};

	$scope.showMetaDataForImage = function(image, pageIndex, imageIndex) {
		
		var element = $('.searchResults .pageIndex'+pageIndex+' .imageIndex'+imageIndex+'.fetchedImage');
		console.log(element);
	}

	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			// User scrolled to bottom
			mvSearchCoordinator.nextPage();
		}
	});
}]);