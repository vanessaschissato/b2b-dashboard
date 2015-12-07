'use strict';

angular.module('dashboardApp.api', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/api', {
    templateUrl: 'views/api.html',
    controller: 'ApiCtrl'
  });
}])

.controller('ApiCtrl', ['$scope', function($scope) {

  // Mock
  $scope.status = {
  	"geral": {
    	"environment": "ar",
    	"error": true
  	},
  	"apis": [
      {
      	"name": "POST /authentication",
      	"time": 2200,
      	"code": "ERROR"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "TIMEOUT"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "ERROR"
      },
      {
      	"name": "POST /authentication",
      	"time": 2200,
      	"code": "ERROR"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "TIMEOUT"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "ERROR"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "ERROR"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "ERROR"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "SUCCESS"
      },
      {
        "name": "GET /order",
        "time": 300,
        "code": "ERROR"
      }
  	]
  }

  $scope.lines = Math.ceil($scope.status.apis.length / 3);

}]);