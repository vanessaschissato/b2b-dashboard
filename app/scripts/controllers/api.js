'use strict';

angular.module('dashboardApp')
.controller('ApiCtrl', ['$scope', '$interval', '$location', 'ApiService', function($scope, $interval, $location, ApiService) {

    var rotateInterval;
    var defaultDelay = 5000;

    $scope.init = function() {

      var fixedEnvironment = $location.search().environment;
      var delay = $location.search().delay;

      // Fixed environment
      if (fixedEnvironment && fixedEnvironment.length > 0) {
        $scope.getStatus(fixedEnvironment);
        return;
      }

      // Rotate between environments
      $scope.delay = delay || defaultDelay;
      $scope.environments = ApiService.getEnvironments();
      $scope.index = 0;

      $scope.rotateEnvironment();
      $scope.stopRotateInterval();
      rotateInterval = $interval(function() { $scope.rotateEnvironment() }, $scope.delay)   
    }

    $scope.$on('$destroy', function() {
      
      // Make sure that the interval is destroyed too
      $scope.stopRotateInterval();
    });

    $scope.stopRotateInterval = function() {

      if (angular.isDefined(rotateInterval)) {
        $interval.cancel(rotateInterval);
        rotateInterval = undefined;
      }
    };
    
    $scope.rotateEnvironment = function() {

      console.log("rotating", $scope.index, $scope.environments[$scope.index].code, $scope.delay)
      $scope.status = {}
      $scope.getStatus($scope.environments[$scope.index].code);
      $scope.index = ($scope.index >= $scope.environments.length - 1) ? 0 : ++$scope.index;
    }

    $scope.getStatus = function(environmentCode) {

      $scope.status = ApiService.getStatus(environmentCode);
      $scope.lines = Math.ceil($scope.status.apis.length / 3);
    } 
  	
    $scope.init();

}]);