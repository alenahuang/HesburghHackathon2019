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

app.controller('loginController', ["$scope", "$http", "$window", function($scope, $http, $window) {
    $scope.logIn = function(username,password){ 
    $http.post('/login',{"username":username,"password":password},"application/json").then(function(res){
        $window.location.href = '/'
        })

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
    $http.get('/reviews',{"params":{"category":"food"}}).then(function (res) {
        $scope.reviews = res.data;
    });
}]);

app.controller('adviceController', ["$scope", "$http", function($scope, $http) {
    $http.get('/advices',{params:{"category":"food"}}).then(function (res) {
        $scope.advices = res.data;
    });
}]);

// Extracurriculars

app.controller('clubsAdviceController', ["$scope", "$http", function($scope, $http) {
    $http.get('/advices',{params:{category:"clubs"}}).then(function (res) {
        $scope.advices = res.data;
    });
}]);

app.controller('eventReviewsController', ["$scope", "$http", function($scope, $http) {
    $http.get('/reviews',{params:{category:"events"}}).then(function (res) {
        $scope.reviews = res.data;
    });
}]);

app.controller('academicsClassController', ["$scope", "$http", function($scope, $http) {
    $http.get('/academicEntries',{params:{category:"classReview"}}).then(function (res) {
        $scope.classes = res.data;
    });
}]);

app.controller('studyAdviceController', ['$scope', '$http', function($scope, $http) {
    $http.get('/academicEntries',{params:{category:'studyAdvice'}}).then(function (res) {
        $scope.studyAdvices = res.data;
    });
}]);

app.controller('careerAdviceController', ['$scope', '$http', function($scope, $http) {
    $http.get('/academicEntries',{params:{category:'careerAdvice'}}).then(function (res) {
        $scope.cadvices = res.data;
    });
}]);

