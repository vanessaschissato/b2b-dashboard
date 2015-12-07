'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboardApp', [
  'ngRoute',
]).
config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.otherwise({redirectTo: '/api'});

  $routeProvider.when('/api', {
    templateUrl: 'views/api.html',
    controller: 'ApiCtrl'
  });
}])