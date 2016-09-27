angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', '$window', function($scope, mvSearchCoordinator, $window) {

	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	};

	var clickedImageSelector;
	$scope.showMetaDataForImage = function(image, pageIndex, imageIndex) {

		var newSelector = '.searchResults .pageIndex'+pageIndex+' .imageIndex'+imageIndex+'.fetchedImage';

		if (clickedImageSelector && clickedImageSelector === newSelector) {
			noImageClicked();
		} else {

			clickedImageSelector = newSelector;

			$('image-meta-data').insertAfter(clickedImageSelector);

			var $element = $(clickedImageSelector);
			console.log($element);

			$scope.clickedImage = image;
			
			adjustImagePointer();
		}
	};
	angular.element($window).bind('resize', function(){
		if ($scope.clickedImage) {
			adjustImagePointer();
			$scope.$digest();
		}
	});
	function adjustImagePointer() {
		var $element = $(clickedImageSelector);
		var x = $element["0"].x + $element["0"].width/2 - 30;
		$('.searchResults .imageMetaData > div.pointer').css({left:x});
	}
	$scope.$on(NEW_SEARCH_SUCCEEDED_EVENT, function(event) {
		noImageClicked();
    });
    function noImageClicked() {
    	$('image-meta-data').insertAfter('.searchResults > img.backgroundImage');
		clickedImageSelector = null;
		$scope.clickedImage = null;
    }
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			// User scrolled to bottom
			mvSearchCoordinator.nextPage();
		}
	});
}]).directive('imageMetaData', [function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/imageMetaData',
		link: function(scope, element, attributes) {
			element.addClass('imageMetaData');
		}
	};
}]);