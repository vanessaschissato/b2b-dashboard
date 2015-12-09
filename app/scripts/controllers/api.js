'use strict';

angular.module('dashboardApp')
.controller('ApiCtrl', ['$scope', '$interval', '$location', 'ApiService', function($scope, $interval, $location, ApiService) {

    var rotateInterval;
    var defaultDelay = 5;
    var minDelay = 1;

    $scope.init = function() {

        ApiService.getEnvironments().then(
            function (result) {
                $scope.environments = result;
                $scope.showView();
            },
            function (error) {
                console.log("GET environments - FAIL", error.statusText);
            }
        );
    }

    $scope.showView = function() {

        var fixedEnvironment = $location.search().environment;
        $scope.delay = $location.search().delay || defaultDelay;
        $scope.delay = ($scope.delay < minDelay) ? minDelay : $scope.delay;

        // Fixed environment
        if (fixedEnvironment && fixedEnvironment.length > 0) {
          $scope.getStatus(fixedEnvironment);
          $scope.setIndexTo(fixedEnvironment);
          return;
        }

        // Setup rotation between environments
        $scope.index = 0;
        $scope.stopRotateInterval();
        $scope.rotateEnvironment();
        $scope.startRotateInterval();
    }

    $scope.$on('$destroy', function() {
      
        // Make sure that the interval is destroyed too
        $scope.stopRotateInterval();
    });

    $scope.isRotating = function() {
        return angular.isDefined(rotateInterval);
    }

    $scope.previousIndex = function() {
        $scope.index = ($scope.index <= 0) ? $scope.environments.length - 1 : --$scope.index;
    }

    $scope.setIndexTo = function(code) {
        for (var i = 0; i < $scope.environments.length; i++) { 
            if ($scope.environments[i].code == code) {
                $scope.index = i;
            } 
        }
    }

    $scope.nextIndex = function() {
        $scope.index = ($scope.index >= $scope.environments.length - 1) ? 0 : ++$scope.index;
    }

    $scope.previousEnvironment = function() {

        var rotating = $scope.isRotating();
        if (rotating) $scope.stopRotateInterval();

        $scope.previousIndex();
        $scope.rotateEnvironment();

        if (rotating) $scope.startRotateInterval();
    }

    $scope.nextEnvironment = function() {

      var rotating = $scope.isRotating();
      if (rotating) $scope.stopRotateInterval();

      $scope.nextIndex();
      $scope.rotateEnvironment();

      if (rotating) $scope.startRotateInterval();
    }

    $scope.togglePlay = function() {
      if ($scope.isRotating()) {
        $scope.stopRotateInterval();
      } else {
        $scope.startRotateInterval();
      }
    }

    $scope.startRotateInterval = function() {
      rotateInterval = $interval(function() { $scope.nextEnvironment() }, ($scope.delay * 1000));  
    }

    $scope.stopRotateInterval = function() {

      if ($scope.isRotating()) {
        $interval.cancel(rotateInterval);
        rotateInterval = undefined;
      }
    };
    
    $scope.rotateEnvironment = function() {

      //$scope.animationClass = 'fade-in';
      console.log("rotating", $scope.index, $scope.environments[$scope.index], $scope.delay + "s")
      $scope.status = {}
      $scope.getStatus($scope.environments[$scope.index].code);
    }

    $scope.getStatus = function(environmentCode) {

      ApiService.getStatus(environmentCode).then(
            function (result) {
                $scope.status = result;
                $scope.lines = Math.ceil($scope.status.apis.length / 3);
            },
            function (error) {
                console.log("GET status - FAIL", error.statusText);
            }
        );
    } 
  	
    $scope.init();

}]);