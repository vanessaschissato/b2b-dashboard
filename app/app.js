'use strict';

angular.module('dashboardApp', [
  	'ngRoute'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  
  	$routeProvider.otherwise({redirectTo: '/api'});

  	$routeProvider.when('/api', {
    	templateUrl: 'views/api.html',
    	controller: 'ApiCtrl'
  	});
}])