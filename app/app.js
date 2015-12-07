'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboardApp', [
  'ngRoute',
  'dashboardApp.api',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/api'});
}]);
