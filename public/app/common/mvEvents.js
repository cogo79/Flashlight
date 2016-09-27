const NEW_SEARCH_SUCCEEDED_EVENT = 'NEW_SEARCH_SUCCEEDED_EVENT';

angular.module('app').factory('mvEvents', ['$rootScope', function($rootScope) {
	return {
        newSearchSucceeded: function() {
            $rootScope.$broadcast(NEW_SEARCH_SUCCEEDED_EVENT);
        }
    };
}]);