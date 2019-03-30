var app = angular.module('app', []);


// app.config(function ($routeProvider) {
// 	// TODO Routing
// 	$routeProvider
// 		.when('/', {
// 			controller: 'main'
// 		})
// });

app.controller('mainController', ["$scope", "$http", function($scope, $http) {
	$scope.title='RateND';
    $scope.a = '';
    $scope.advices = [];
    $scope.searchByKeyword = function() {

        $http.get('/asdf', $scope.title).then(function (res) {
        });
    }
    $scope.test = function() {
        $http.get('/test').then(function (res) {
            $scope.advices = res.data;
        });
    }
    }
]);
