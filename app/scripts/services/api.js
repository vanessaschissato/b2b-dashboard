'use strict';

angular.module('dashboardApp')
.service('ApiService', ['CONFIG', '$q', '$http', function(CONFIG, $q, $http) {

	this.getEnvironments = function() {

		var deferred = $q.defer();
 
	    return $http.get(CONFIG.environmentsEndpoint)
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
 
	    return $http.get(CONFIG.statusEndpoint + '?env=' + code)
	        .then(function (response) {
	            deferred.resolve(response.data);
	            return deferred.promise;
	        }, function (response) {
	            deferred.reject(response);
	            return deferred.promise;
	        });
	}

}]);