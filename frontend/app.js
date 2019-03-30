var app = angular.module('app', []);


// app.config(function ($routeProvider) {
// 	// TODO Routing
// 	$routeProvider
// 		.when('/', {
// 			controller: 'main'
// 		})
// });

app.controller('mainController', ["$scope", function($scope, $http) {
	$scope.title='RateND';
    $scope.searchByKeyword = function() {
        $http.get('/asdf', $scope.title)
            .success();
    }
    }
}]);
