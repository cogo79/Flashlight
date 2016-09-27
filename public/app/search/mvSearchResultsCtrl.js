angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', function($scope, mvSearchCoordinator) {
	$scope.pages = function() {
		return mvSearchCoordinator.searchResults();	
	};

	var clickedImageSelector;
	$scope.showMetaDataForImage = function(image, pageIndex, imageIndex) {

		var newSelector = '.searchResults .pageIndex'+pageIndex+' .imageIndex'+imageIndex+'.fetchedImage';

		if (clickedImageSelector && clickedImageSelector === newSelector) {
			clickedImageSelector = null;
			$scope.clickedImage = null;
		} else {

			clickedImageSelector = newSelector;

			$('image-meta-data').insertAfter(clickedImageSelector);

			var $element = $(clickedImageSelector);
			console.log($element);

			$scope.clickedImage = image;
			
			adjustImagePointer();
		}
	};

	function adjustImagePointer() {
		var $element = $(clickedImageSelector);
		var x = $element["0"].x + $element["0"].width/2 - 30;
		$('.searchResults .imageMetaData > div.pointer').css({left:x});
	}

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