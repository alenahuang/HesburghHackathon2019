var app = angular.module('app', []);

// Controllers

app.controller('mainController', ["$scope", "$http", function($scope, $http) {
	$scope.title='RateND';
    $scope.a = '';
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

app.controller('loginController', ["$scope", "$http", function($scope, $http) {
    $http.get('/reviews').then(function (res) {
        $scope.reviews = res.data;
    });

    $scope.logIn = function(){
        $http.post('/login').then(function(res){

    });

    }
    
}]);

app.controller('reviewsController', ["$scope", "$http", function($scope, $http) {
        $scope.category = 'food'

    $http.get('/reviews',{params:{"category":$scope.category}}).then(function (res) {
        $scope.advices = res.data;
    });
}]);

app.controller('adviceController', ["$scope", "$http", function($scope, $http) {
    $scope.advices = [];
    $scope.category = 'food'

    $http.get('/advices',{params:{"category":$scope.category}}).then(function (res) {
        $scope.advices = res.data;
    });
}]);

app.controller('academicsController', ["$scope", "$http", function($scope, $http) {

}]);
