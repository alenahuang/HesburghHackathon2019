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
}]);

app.controller('loginController', ["$scope", "$http", function($scope, $http) {
    $scope.logIn = function(username,password){
        $http.post('/login',{"username":username,"password":password},"application/json").then(function(res){

    });

    }
    
}]);

app.controller('userCreationController', ["$scope", "$http", function($scope, $http) {
    $scope.createUser = function(username,password,email,year,major,resHall){
        data = {"username":username,"password":password,"email":email,"year":year,"major":major,"resHall":resHall}

        $http.post('/user',data,"application/json").then(function(res){
            alert("LOL")

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
