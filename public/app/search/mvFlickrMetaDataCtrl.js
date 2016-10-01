angular.module('app')
.controller('mvFlickrMetaDataCtrl', ['$scope', '$window', function($scope, $window) {
	
	$scope.FLICKR = FLICKR;

	angular.element($window).bind('resize', function(){
		
		$scope.$digest();
	});
}])
.directive('flickrMetaData', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/flickrMetaData'
	};
});