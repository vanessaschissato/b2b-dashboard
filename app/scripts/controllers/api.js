'use strict';

angular.module('dashboardApp')
.controller('ApiCtrl', ['$scope', 'ApiService', function($scope, ApiService) {
	
  $scope.status = ApiService.getStatus()

  $scope.lines = Math.ceil($scope.status.apis.length / 3);

}]);