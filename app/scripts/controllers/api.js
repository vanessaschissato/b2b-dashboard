'use strict';

angular.module('dashboardApp')
.controller('ApiCtrl', ['CONFIG', '$scope', '$interval', '$location', 'ApiService', function(CONFIG, $scope, $interval, $location, ApiService) {

    var rotateInterval;
    var isRotating;

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
          $scope.fixEnvironment(fixedEnvironment);
          return;
        }

        // Setup rotation between environments
        $scope.index = 0;
        $scope.rotateEnvironment();
    }

    $scope.fixEnvironment = function(code) {
        $scope.getStatus(code, false);
        $scope.setIndexTo(code);
    } 

    $scope.isRotating = function() {
        return isRotating;
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

        $scope.stopAndResetTimer();

        $scope.previousIndex();
        $scope.rotateEnvironment();
    }

    $scope.nextEnvironment = function() {

        $scope.stopAndResetTimer();

        $scope.nextIndex();
        $scope.rotateEnvironment();
    }

    $scope.timeout = function() {
      $scope.nextEnvironment();
    }

    $scope.togglePlay = function() {
      if ($scope.isRotating()) {
        $scope.stopTimer();
      } else {
        $scope.startTimer();
      }
    }
    
    $scope.rotateEnvironment = function() {

      $scope.fade = true;
      $scope.getStatus($scope.environments[$scope.index].code, true);
    }

    $scope.getStatus = function(environmentCode, start) {

      console.log("rotating", $scope.index, $scope.environments[$scope.index], $scope.delay + "s")
      ApiService.getStatus(environmentCode).then(
            function (result) {

                $scope.status = result;
                var generated = moment.utc(result.general.generated);
                var diff = moment.duration(moment.utc().diff(generated));
                $scope.generatedMinutesAgo = Math.round(diff.asMinutes());
                $scope.generated = generated.toDate();
                $scope.lines = Math.ceil($scope.status.apis.length / 3);
                
                if (!start) {
                  $scope.stopAndResetTimer();
                } else {
                  $scope.startTimer();
                }
                $scope.fade = false;
            },
            function (error) {
                $scope.fade = false;
                alert("Fail to get statuses to " + environmentCode + " [Error = "+ error.statusText +"]")
                console.log("GET status - FAIL", error);
            }
        );
    } 
  	
    $scope.stopAndResetTimer = function() {
        $scope.stopTimer();
        $scope.resetTimer();
    }

    $scope.resetTimer = function() {
        $scope.$broadcast('timer-set-countdown', $scope.delay);
        console.log("reseting")
    }

    $scope.startTimer = function() {
        isRotating = true;
        $scope.$broadcast('timer-start');
        console.log("starting")
    }

    $scope.stopTimer = function() {
        isRotating = false;
        $scope.$broadcast('timer-stop');
        console.log("stopping")
    }

    $scope.init();

}]);