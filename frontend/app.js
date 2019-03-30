var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
	// TODO Routing
	$routeProvider
		.when('/', {
			controller: 'main'
		})
});

app.controller('main', ['$scope', '$http', function($scope, $http) {
	$scope.title='RateND';
}]);


angular.module('app', [$scope])
	.controller('main', function($scope) {
	});
