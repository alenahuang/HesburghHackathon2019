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
    $scope.searchByKeyword = function() {

        $http.get('/asdf', $scope.title).then(function(res){
            $scope.a = res.data
        })

    }
    }
]);
