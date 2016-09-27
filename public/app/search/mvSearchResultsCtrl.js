angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	};

	var previousSelector;
	$scope.showMetaDataForImage = function(image, pageIndex, imageIndex) {

		var selector = '.searchResults .pageIndex'+pageIndex+' .imageIndex'+imageIndex+'.fetchedImage';

		if (previousSelector && previousSelector === selector) {
			previousSelector = null;
			$scope.clickedImage = null;
		} else {
			
			$('image-meta-data').insertAfter(selector);

			var $element = $(selector);
			console.log($element);

			$scope.clickedImage = image;
			previousSelector = selector;
		}
	};



	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			// User scrolled to bottom
			mvSearchCoordinator.nextPage();
		}
	});
}]).directive('imageMetaData', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/imageMetaData',
		link: function(scope, element, attributes){
			element.addClass('imageMetaData');
		}
	};
});