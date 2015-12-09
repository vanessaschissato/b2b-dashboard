'use strict';

angular.module('dashboardApp')
.controller('ApiCtrl', ['CONFIG', '$scope', '$interval', '$location', 'ApiService', function(CONFIG, $scope, $interval, $location, ApiService) {

    var rotateInterval;

    $scope.init = function() {

        ApiService.getEnvironments().then(
            function (result) {
                $scope.environments = result;
                $scope.showView();
            },
            function (error) {
                alert("Fail to get environments [Error = "+ error.statusText +"]")
                console.log("GET environments - FAIL", error);
            }
        );
    }

    $scope.showView = function() {

        var fixedEnvironment = $location.search().environment;
        $scope.delay = $location.search().delay || CONFIG.defaultDelay;
        $scope.delay = ($scope.delay < CONFIG.minDelay) ? CONFIG.minDelay : $scope.delay;

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

      //$scope.status = undefined;
      $scope.fade = true;
      $scope.getStatus($scope.environments[$scope.index].code);
    }

    $scope.getStatus = function(environmentCode) {

      console.log("rotating", $scope.index, $scope.environments[$scope.index], $scope.delay + "s")
      ApiService.getStatus(environmentCode).then(
            function (result) {
                $scope.fade = false;
                $scope.status = result;
                $scope.lines = Math.ceil($scope.status.apis.length / 3);
            },
            function (error) {
                $scope.fade = false;
                alert("Fail to get statuses to " + environmentCode + " [Error = "+ error.statusText +"]")
                console.log("GET status - FAIL", error);
            }
        );
    } 
  	
    $scope.init();

}]);