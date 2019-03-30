var app = angular.module('app', []);


// app.config(function ($routeProvider) {
// 	// TODO Routing
// 	$routeProvider
// 		.when('/', {
// 			controller: 'main'
// 		})
// });

app.controller('mainController', ["$scope", function($scope) {
	$scope.title='RateND';
    console.log($scope.title);
}]);
