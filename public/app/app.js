
angular.module('app', ['ngRoute']);

angular.module('app').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl:'/partials/search/search', controller: 'mvSearchCtrl'})
		.otherwise('/');
}]);

