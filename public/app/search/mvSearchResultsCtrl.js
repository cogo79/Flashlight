angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', '$window', 'mvEvents', function($scope, mvSearchCoordinator, $window, mvEvents) {

	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	};

	var clickedImageSelector;
	$scope.showMetaDataForImage = function(image, pageIndex, imageIndex) {

		$scope.clickedImage = image;

		var newSelector = '.searchResults .pageIndex'+pageIndex+' .imageIndex'+imageIndex+'.fetchedImage';

		if (clickedImageSelector && clickedImageSelector === newSelector) {
			noImageClicked();
		} else {
			if (!$scope.clickedImage.additionalMetaData) {
				var promise = mvSearchCoordinator.getAdditionalMetaData($scope.clickedImage);
				if (promise) {
					promise.then(function(result) {
						$scope.clickedImage.additionalMetaData = result;
						mvEvents.fetchedAdditionalMetaDataFromFlickr(result);
					}, function errorFetchingAdditionalMetaDataForImage(response) {
						console.log(response);
					});
				}
			}

			clickedImageSelector = newSelector;

			$('image-meta-data').insertAfter(clickedImageSelector);

			var $element = $(clickedImageSelector);
			
			adjustImagePointer();
		}
	};
	angular.element($window).bind('resize', function(){
		if (clickedImageSelector) {
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