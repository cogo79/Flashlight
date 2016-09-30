angular.module('app')
.controller('mvFlickrMetaDataCtrl', ['$scope', function($scope) {
	
	$scope.FLICKR = FLICKR;
}])
.directive('flickrMetaData', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/search/flickrMetaData'
	};
});