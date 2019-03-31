
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


app.get('/username', (req, res)=>{
    var currentUser = Parse.User.current()
    var username = currentUser.get("username");
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


app.post('/user', (req, res) => {
    console.log(req)
   var user = new Parse.User();
   var username = req.body.username;
   var password = req.body.password;
   var email = req.body.email;
   var year = req.body.year;
   var major = req.body.major;
   var resHall = req.body.resHall;

   user.set('username', username);
   user.set('password', password);
   user.set('email', email);
   user.set('year', year);
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
