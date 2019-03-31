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

app.controller('userCreationController', ["$scope", "$http", "$window", function($scope, $http, $window) {
    $scope.createUser = function(username,password,email,year,major,resHall) {
        data = {"username":username,"password":password,"email":email,"year":year,"major":major,"resHall":resHall}
        $http.post('/user', data, 'application/json').then(res => {
           $window.location.href = '/';
        });
    }

}]);

app.controller('submissionController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    $scope.classes = function(classTitle, professor, course, classExp) {
        data = {"title": classTitle, "professor": professor, "course": course, "classExp": classExp, "section": "classReview"}
        $http.post('/makeAcademicEntry', data, 'application/json').then(res => {
           $window.location.href = '/';
        });
    }
    $scope.study = function(studyTitle, studyAdvice) {
        data = {"title": studyTitle, "studyAdvice": studyAdvice, "section": "studyAdvice"};
        $http.post('/makeAcademicEntry', data, 'application/json').then(res => {
           $window.location.href = '/';
        });
    }
    $scope.career = function(careerTitle, careerAdvice) {
        data = {"title": careerTitle, "careerAdvice": careerAdvice, "section": "careerAdvice"};
        $http.post('/makeAcademicEntry', data, 'application/json').then(res => {
           $window.location.href = '/';
        });
    }
    $scope.clubs = function(clubsExp, title) {
        data = {"advice": clubsExp, "title": title, "section": "clubs"};
        $http.post('/makeAdvice', data, 'applcation/json').then(res => {
           $window.location.href = '/';
        });
    }
    $scope.events = function(ecStars, event, ecsExp) {
        data = {"review": ecsExp, "location": event, "section": "events"};
        $http.post('/makeReview', data, 'application/json').then(res => {
           $window.location.href = '/';
        });
    }
    $scope.review = function(foodStars, place, foodExp) {
        data = {"review": foodExp, "location": place, "stars": foodStars, "section": "food"};
        $http.post('/makeReview', data, 'application/json').then(res => {
            $window.location.href = '/';
        });
    }
    $scope.advice = function(foodAdvice, title) {
        data = {"advice": foodAdvice, "title": title, "section": "food"};
        $http.post('/makeAdvice', data, 'application/json').then(res => {
            $window.location.href = '/';
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


app.controller('submissionsController', ["$scope", "$http", function($scope, $http) {
    $scope.getAll = function(){
        var divs = document.querySelectorAll(".iWantThis");
        var theDiv = ""
        for(var i = 0; i < divs.length; i++){
            if(divs[i].style.display === "block"){
                theDiv = divs[i]
            }
        }
        alert(theDiv.innerHTML)

    }
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
