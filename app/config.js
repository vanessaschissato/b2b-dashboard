angular.module('dashboardApp').constant('CONFIG', {
	minDelay: 1,
	defaultDelay: 5,
  	environmentsEndpoint: 'http://www.nessauepa.com.br/dashboard/app/environments.json',
  	statusEndpoint: 'http://www.nessauepa.com.br/dashboard/app/status.json'
});