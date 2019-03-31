
const express = require('express');
const app = express();
const fs = require("fs");
const Parse = require('Parse/node');
const bodyParser = require('body-Parser');
const port = 3000;
const urlPath = "localhost:3000/";

Parse.initialize('1UL4z4XXj5lcw7FqCZQDi9AEY9oBaCLDU1hlLsDI', 'wCS800zhokit6qVVcY7dvJdunL0yAuIDKe2em9sV');
Parse.serverURL = 'https://parseapi.back4app.com/';

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../frontend'));

// Routes


app.get('/', (req, res)=>{
    var currentUser = Parse.User.current()
    if(currentUser){
        fs.readFile("../frontend/home.html",'utf8',(err,data)=>{
            res.contentType("text/html");
            res.send(data);
        });
    }else{
        res.redirect("/login")
    }

});


app.get('/userInfo/:thing', (req, res)=>{
    var currentUser = Parse.User.current()
    var username = String(currentUser.get(req.params["thing"]));
    res.send(username)
});

app.get('/advices', (req, res) => {
    var Advice = Parse.Object.extend('Advice');
    var query = new Parse.Query(Advice);
    query.equalTo('section',req.query["category"])
    query.find()
        .then(data => {
           res.send(data);
        });
});


app.get('/reviews', (req, res) => {
    var Reviews = Parse.Object.extend('Review');
    var query = new Parse.Query(Reviews);
    query.equalTo('section',req.query["category"])
    query.find()
        .then(data => {
            res.send(data);
        });
});

app.get('/userReviews', (req, res) => {
    var Reviews = Parse.Object.extend('Review');
    var query = new Parse.Query(Reviews);
    query.equalTo('user',req.query["username"])
    query.find()
        .then(data => {
            res.send(data);
        });
});

app.get('/userAdvices', (req, res) => {
    var Advice = Parse.Object.extend('Advice');
    var query = new Parse.Query(Advice);
    query.equalTo('user',req.query["username"])
    query.find()
        .then(data => {
           res.send(data);
        });
});

app.post('/user', (req, res) => {
   var user = new Parse.User();
   var username = req.body.username;
   var password = req.body.password;
   var email = req.body.email;
    var year = parseInt(req.body.year);
   var major = req.body.major;
   var resHall = req.body.resHall;

   user.set('username', username);
   user.set('password', password);
   user.set('email', email);
   user.set('gradYear', year);
   user.set('major', major);
   user.set('resHall', resHall);
   user.signUp().then(user => {
      var sessionToken = user.getSessionToken();
   }).catch(error => console.log('Error: ', error));

   res.sendStatus(200);
});

app.get('/login', (req, res) => {
    fs.readFile("../frontend/login.html",'utf8',(err,data)=>{
        res.contentType("text/html");
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    const user = Parse.User.logIn(username, password)
       .then(usr => {
           Parse.User.enableUnsafeCurrentUser()
           var sessionToken = usr.getSessionToken();
           Parse.User.become(sessionToken).then(function (user) {
               console.log('Logged in!');
               res.sendStatus(200)
           }, function (error) {
  // The token could not be validated.
           });

       }).catch(error => console.log('Error: ', error));

});

app.get('/academicEntries', (req, res) => {
   var AcademicEntry = Parse.Object.extend('AcademicEntry');
   var query = new Parse.Query(AcademicEntry);
   query.equalTo('section', req.query['category']);
   query.find()
       .then(data => {
           res.send(data);
       }).catch(error => console.log('Error: ', error));
});

app.post('/makeAcademicEntry', (req, res) => {
   var AcademicEntry = Parse.Object.extend('AcademicEntry');
   var academicEntry = new AcademicEntry();
   academicEntry.set('experience', req.body.experience);
   academicEntry.set('advice', req.body.careerAdvice);
   academicEntry.set('user', Parse.User.current());
   academicEntry.set('userUsername', Parse.User.current().get('username'));
    academicEntry.set('stars', parseInt(req.body.stars));
   var today = new Date();
   academicEntry.set('timestamp', today.toDateString());
   academicEntry.set('upvotes', 0);
   academicEntry.set('downvotes', 0);
   academicEntry.set('professor', req.body.professor);
   academicEntry.set('course', req.body.course);
   academicEntry.set('section', req.body.section);
   academicEntry.set('title', req.body.title);
   if (!((req.body.classExp) === undefined)) {
        academicEntry.set('text', req.body.classExp);
   }
   else if (!((req.body.studyAdvice) === undefined)) {
       academicEntry.set('text', req.body.studyAdvice);
   }
   else if (!((req.body.careerAdvice) === undefined)) {
       academicEntry.set('text', req.body.careerAdvice);
   }

   academicEntry.save()
       .then((entry => {
           console.log(entry);
           res.sendStatus(200);
           }
       )).catch(error => console.log('Error: ', error));
});

app.post('/makeAdvice', (req, res) => {
    // var user = Parse.User.current();
    var Advice = Parse.Object.extend('Advice');
    var aadvice = new Parse.Advice();
    aadvice.set('user', Parse.User.current());
    aadvice.set('userUsername', Parse.User.current().get('username'));
    aadvice.set('text', req.body.advice);
    var today = new Date();
    aadvice.set('timestamp', today.now().toDateString());
    aadvice.set('upvotes', 0);
    aadvice.set('downvotes', 0);
    aadvice.set('location', req.body.location);
    aadvice.set('section', req.body.section);
    advice.set('title', req.body.title);

    aadvice.save()
        .then((entry => {
                console.log(entry);
                res.sendStatus(200);
            }
        )).catch(error => console.log('Error: ', error));
});

app.post('/makeReview', (req, res) => {
    var Review = Parse.Object.extend('Review');
    var review = new Review();
    review.set('user', Parse.User.current());
    review.set('userUsername', Parse.User.current().get('username'));
    review.set('text', req.body.review);
    var today = new Date();
    review.set('timestamp', today.now().toDateString());
    review.set('upvotes', 0);
    review.set('downvotes', 0);
    review.set('location', req.body.location);
    review.set('section', req.body.section);
    review.set('stars', parseInt(req.body.stars));

    review.save()
        .then((entry => {
                console.log(entry);
                res.sendStatus(200);
            }
        )).catch(error => console.log('Error: ', error));
});

app.post('/thumbs',(req,res)=>{
    var postType = req.body.postType
    // var postRequest = Parse.Object.extend(postType);
    var query = new Parse.Query(postType)
    query.equalTo('objectId', req.body.postID);
    query.first()
         .then((entry => {
             entry.save().then(entry =>{
                 if(req.body.up){
                     entry.set("upvotes", req.body.count+1)
                 }else{
                     entry.set("downvotes", req.body.count+1)
                 }

                 return entry.save()
             })
         })).then((entry =>{
             res.sendStatus(200)
         })).catch(error => console.log('Error: ', error));
})

app.get('/logout', (req, res) => {
   var user = Parse.User.current();
   var isLoggedIn = true;
   if (user===undefined) {
       isLoggedIn = false;
       res.send(isLoggedIn);
   }
   else {
       res.send(isLoggedIn);
   }
});

app.post('/logout', (req, res) => {
   Parse.User.logOut().then(() => {
       var currentUser = Parse.User.current();
       res.sendStatus(200);
   }).catch(error => console.log('Error: ', error));
});
