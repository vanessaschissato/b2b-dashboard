'use strict';

angular.module('dashboardApp')
.service('ApiService', function() {

	 // Mocked
	this.getStatus = function() {
		return {
	  	"environments": 
	  		[
	  			{
	    			"code": "ar",
	    			"name": "Argentina"
	    		},
	    		{
	    			"code": "co",
	    			"name": "Colombia"
	    		},
	    		{
	    			"code": "mx",
	    			"name": "Mexico"
	    		}
			]
		}
	}

    // Mocked
	this.getStatus = function() {
		return {
	  	"geral": {
	    	"environment": {
	    		"code": "ar",
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
	}

});