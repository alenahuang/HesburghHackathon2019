var app = angular.module('app', []);
// Controllers

app.controller('mainController', ["$scope", "$http","$window", function($scope, $http,$window) {
	$scope.title='RateND';
    $scope.a = '';
    $scope.username = "Anonymous"

    $scope.allData = [];
    $scope.keyword = '';

    $http.get("/userInfo/username").then(function(res){
        $scope.username = res.data;
    })

    $scope.searchByKeyword = function(keyword) {
        data={"keyword": keyword};
        $scope.keyword = keyword;
        $scope.allData = $http.post('/search', data, 'application/json').then((res) => {
            $scope.keyword = res[1];
            $scope.allData = res[0];
            console.log($scope.keyword);
            console.log($scope.allData);
            $window.location.href = '/search.html';
        });
    }

    $scope.test = function() {
        $http.get('/test').then(function (res) {
            $scope.advices = res.data;
        });
    }

    $scope.gotoProfile = function(){
        $window.location.href = '/profile.html'
    }
}]);

app.controller("profileController",["$scope","$http",function($scope,$http){
    $http.get("/userInfo/email").then(function(res){
        $scope.email = res.data;
    })
     $http.get("/userInfo/major").then(function(res){
        $scope.major = res.data;
    })
     $http.get("/userInfo/resHall").then(function(res){
        $scope.resHall = res.data;
    })
    $http.get("/userInfo/gradYear").then(function(res){
        $scope.gradYear = res.data;
    })
    $http.get('/userReviews',{"params":{"username":$scope.username}}).then(function (res) {
        $scope.reviews = res.data;
    });
    $http.get('/userAdvices',{"params":{"username":$scope.username}}).then(function (res) {
        $scope.advices = res.data;
    });


}])
app.controller('loginController', ["$scope", "$http", "$window", function($scope, $http, $window) {
    $scope.logIn = function(username,password){ 
    $http.post('/login',{"username":username,"password":password},"application/json").then(function(res){
        $window.location.href = '/'
        })

    }
    
}]);

app.controller('userCreationController', ["$scope", "$http", "$window",function($scope, $http,$window) {
    $scope.createUser = function(username,password,email,year,major,resHall){
        data = {"username":username,"password":password,"email":email,"year":year,"major":major,"resHall":resHall}
        $http.post('/user',data,"application/json").then(function(res){
            $window.location.href = "/login.html"
    });

    }

}]);

app.controller('submissionController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.classes = function(classTitle, professor, course, classExp, someStars) {
        data = {"title": classTitle, "professor": professor, "course": course, "classExp": classExp, "section": "classReview","stars":someStars}

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
    $scope.events = function(event, ecsExp,ecStars) {
        data = {"stars":ecStars, "review": ecsExp, "location": event, "section": "events"};
        $http.post('/makeReview', data, 'application/json').then(res => {
           $window.location.href = '/' ;
        });
    }
    $scope.review = function(place,foodExp,foodStars) {
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

app.controller('reviewsController', ["$scope", "$http","orderByFilter", function($scope, $http, orderBy) {
    $http.get('/reviews',{"params":{"category":"food"}}).then(function (res) {
        $scope.reviews = res.data;
    });

    $scope.upvotes = function(){
        $scope.reviews = orderBy($scope.reviews, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.reviews = orderBy($scope.reviews, "createdAt", true);
    }
     $scope.stars = function(most){
         if(most){
              $scope.reviews = orderBy($scope.reviews, "stars", true);
         }else{
              $scope.reviews = orderBy($scope.reviews, "stars", false);
         }
    }

     $scope.thumbs = function(thePost,count,up){
        var data = {"category":"classReview","count":count,"postType":"Review","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.reviews.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }
}]);

app.controller('adviceController', ["$scope", "$http", "orderByFilter", function($scope, $http, orderBy) {
    $http.get('/advices',{params:{"category":"food"}}).then(function (res) {
        $scope.advices = res.data;
    });

    $scope.upvotes = function(){
        $scope.advices = orderBy($scope.advices, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.advices = orderBy($scope.advices, "createdAt", true);
    }

     $scope.thumbs = function(thePost,count,up){
        var data = {"category":"classReview","count":count,"postType":"Advice","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.advices.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }
}]);

// Extracurriculars

app.controller('clubsAdviceController', ["$scope", "$http", "orderByFilter", function($scope, $http, orderBy) {
    $http.get('/advices',{params:{category:"clubs"}}).then(function (res) {
        $scope.advices = res.data;
    });


    $scope.upvotes = function(){
        $scope.advices = orderBy($scope.advices, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.advices = orderBy($scope.advices, "createdAt", true);
    }

     $scope.thumbs = function(thePost,count,up){
        var data = {"category":"classReview","count":count,"postType":"Advice","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.advices.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }
}]);

app.controller('eventReviewsController', ["$scope", "$http","orderByFilter", function($scope, $http, orderBy) {
    $http.get('/reviews',{params:{category:"events"}}).then(function (res) {
        $scope.reviews = res.data;
    });

    $scope.upvotes = function(){
        $scope.reviews = orderBy($scope.reviews, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.reviews = orderBy($scope.reviews, "createdAt", true);
    }
     $scope.stars = function(most){
         if(most){
              $scope.reviews = orderBy($scope.reviews, "stars", true);
         }else{
              $scope.reviews = orderBy($scope.reviews, "stars", false);
         }
    }

    $scope.thumbs = function(thePost,count,up){
        var data = {"category":"classReview","count":count,"postType":"Review","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.reviews.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }

}]);

app.controller('academicsClassController', ["$scope", "$http","orderByFilter", function($scope, $http,orderBy) {
    $http.get('/academicEntries',{params:{category:"classReview"}}).then(function (res) {
        $scope.classes = res.data;
    });
     $scope.upvotes = function(){
        $scope.classes = orderBy($scope.classes, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.classes = orderBy($scope.classes, "createdAt", true);
    }
     $scope.stars = function(most){
         if(most){
              $scope.classes = orderBy($scope.classes, "stars", true);
         }else{
             $scope.classes = orderBy($scope.classes, "stars", false);
         }
    }

    $scope.thumbs = function(thePost,count,up){

        var data = {"category":"classReview","count":count,"postType":"AcademicEntry","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.classes.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }
}]);

app.controller('studyAdviceController', ['$scope', '$http', "orderByFilter", function($scope, $http, orderBy) {
    $http.get('/academicEntries',{params:{category:'studyAdvice'}}).then(function (res) {
        $scope.studyAdvices = res.data;
    });

    $scope.upvotes = function(){
        $scope.studyAdvices= orderBy($scope.studyAdvices, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.studyAdvices = orderBy($scope.studyAdvices, "createdAt", true);
    }

    $scope.thumbs = function(thePost,count,up){

        var data = {"category":"classReview","count":count,"postType":"AcademicEntry","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.studyAdvices.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }

}]);

app.controller('careerAdviceController', ['$scope', '$http',"orderByFilter", function($scope, $http,orderBy) {
    $http.get('/academicEntries',{params:{category:'careerAdvice'}}).then(function (res) {
        $scope.cadvices = res.data;
    });
    $scope.upvotes = function(){
        $scope.cadvices= orderBy($scope.cadvices, "upvotes", true);
    }

    $scope.newest = function(){
        $scope.cadvices = orderBy($scope.cadvices, "createdAt", true);
    }


    $scope.thumbs = function(thePost,count,up){
        var data = {"category":"classReview","count":count,"postType":"AcademicEntry","postID":thePost,"up":up}
        $http.post('/thumbs',data, 'application/json').then(res => {
            var post = $scope.cadvices.find(function(item){
                return item.objectId == thePost
            })
            if(up){
                 post.upvotes = count+1
             }else{
                 post.downvotes = count+1
             }
        });
    }
}]);

app.controller('logoutController', ['$scope', '$http', '$window', function($scope, $http, $window) {
   $scope.logout = function() {

       $http.get('/logout').then(function (res) {
          isLoggedIn = res.data;
           if (isLoggedIn) {
               $http.post('/logout').then(function (res) {
                   $window.location.href = '/login';
               });
           }
           else {

           }
       });
   }
}]);