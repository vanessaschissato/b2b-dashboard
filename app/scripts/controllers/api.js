'use strict';

angular.module('dashboardApp')
.controller('ApiCtrl', ['$scope', '$interval', '$location', 'ApiService', function($scope, $interval, $location, ApiService) {

	var fixedEnvironment = $location.search().environment;

	// TODO: REFACTOR THIS!
	if (fixedEnvironment && fixedEnvironment.length > 0) {
		$scope.status = ApiService.getStatus(fixedEnvironment);
  		$scope.lines = Math.ceil($scope.status.apis.length / 3);
  		return;
	}

  	var environments = ApiService.getEnvironments();
  	var index = 0;
  	$interval(function() {

  		$scope.status = {}
  		var environment = environments[index];

  		$scope.status = ApiService.getStatus(environment.code);
  		$scope.lines = Math.ceil($scope.status.apis.length / 3);

  		index = (index >= environments.length - 1) ? 0 : ++index;
  		
  	}, 5000)
  	

  	

}]);