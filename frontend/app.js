var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
	// TODO Routing
	$routeProvider
		.when('/', {
			templateUrl: ,
			controller: 'main'
		})
});

app.controller('main', ['$scope', '$http', function($scope, $http) {
	$scope.title='Home';
}]);


angular.module('app', [$scope])
	.controller('indexCtrl', function($scope) {
	});