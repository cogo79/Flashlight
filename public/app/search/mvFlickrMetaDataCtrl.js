angular.module('app')
.controller('mvFlickrMetaDataCtrl', ['$scope', '$window', function($scope, $window) {
	
	$scope.FLICKR = FLICKR;

	$scope.gotoPhotoSite = function() {
		if ($scope.$parent.clickedImage.additionalMetaData.siteURL) {
			$window.open($scope.$parent.clickedImage.additionalMetaData.siteURL);
		}
	};

	angular.element($window).bind('resize', function(){
		var selector = '.searchResults .imageMetaData > div.content flickr-meta-data .info';
		if ($window.innerWidth < 1121) {
			var imgHeight = $('.searchResults .imageMetaData > div.content flickr-meta-data .figure > img').outerHeight();
			angular.element(selector).css({"margin-top":imgHeight+14});
			
		} else {
			angular.element(selector).css({"margin-top":0});
		}
		$scope.$digest();
	});
}])
.directive('flickrMetaData', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/flickrMetaData'
	};
});