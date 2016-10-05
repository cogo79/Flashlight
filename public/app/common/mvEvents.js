const NEW_SEARCH_SUCCEEDED_EVENT = 'NEW_SEARCH_SUCCEEDED_EVENT';
const FETCHED_ADDITIONAL_META_DATA_FROM_FLICKR_EVENT = 'FETCHED_ADDITIONAL_META_DATA_FROM_FLICKR_EVENT';

angular.module('app').factory('mvEvents', ['$rootScope', function($rootScope) {
	return {
        newSearchSucceeded: function() {
            $rootScope.$broadcast(NEW_SEARCH_SUCCEEDED_EVENT);
        },
        fetchedAdditionalMetaDataFromFlickr: function(additionalMetaData) {
        	$rootScope.$broadcast(FETCHED_ADDITIONAL_META_DATA_FROM_FLICKR_EVENT, additionalMetaData);	
        }
    };
}]);