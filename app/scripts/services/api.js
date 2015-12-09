'use strict';

angular.module('dashboardApp')
.service('ApiService', ['$q', '$http', function($q, $http) {

	this.getEnvironments = function() {

		var deferred = $q.defer();
 
	    return $http.get('http://www.nessauepa.com.br/dashboard/app/environments.json')
	        .then(function (response) {
	            deferred.resolve(response.data.environments);
	            return deferred.promise;
	        }, function (response) {
	            deferred.reject(response);
	            return deferred.promise;
	        });
	}

	this.getStatus = function(code) {

		var deferred = $q.defer();
 
	    return $http.get('http://www.nessauepa.com.br/dashboard/app/status.json?environment=' + code)
	        .then(function (response) {
	            deferred.resolve(response.data);
	            return deferred.promise;
	        }, function (response) {
	            deferred.reject(response);
	            return deferred.promise;
	        });
	}

}]);