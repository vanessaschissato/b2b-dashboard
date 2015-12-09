'use strict';

angular.module('dashboardApp')
.service('ApiService', ['$q', '$http', function($q, $http) {

	 // Mocked
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

    // Mocked
	this.getStatus = function(code) {
		var response = {
		  	"geral": {
		    	"environment": {
		    		"code": code,
		    		"name": "Argentina"
		    	},
		    	"error": true
		  	},
		  	"apis": 
		  		[
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
			      	}
		  		]
		  	}


		return response;
	}

}]);