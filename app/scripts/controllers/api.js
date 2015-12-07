'use strict';

angular.module('dashboardApp.api', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/api', {
    templateUrl: 'views/api.html',
    controller: 'ApiCtrl'
  });
}])

.controller('ApiCtrl', [function() {

}]);