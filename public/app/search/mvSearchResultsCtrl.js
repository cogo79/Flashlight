angular.module('app').controller('mvSearchResultsCtrl', ['$scope', 'mvSearchCoordinator', '$window', function($scope, mvSearchCoordinator, $window) {
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
	angular.element($window).bind('resize', function(){
		adjustImagePointer();
		$scope.$digest();
	});
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
}]).directive('imageMetaData', [function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/imageMetaData',
		link: function(scope, element, attributes) {
			element.addClass('imageMetaData');
		}
		/*
		function link(scope, element, attrs){

       scope.width = $window.innerWidth;

       angular.element($window).bind('resize', function(){

         scope.width = $window.innerWidth;

         // manuall $digest required as resize event
         // is outside of angular
         scope.$digest();
       });

     }*/
	};
}]);