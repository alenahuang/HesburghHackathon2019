
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
    fs.readFile("../frontend/home.html",'utf8',(err,data)=>{
            res.contentType("text/html");
            res.send(data);
        });
});


app.get('/asdf', (req, res)=>{
    res.send('LOLISBEAUTIFUL');
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
   user.set('gradYear', year);
   user.set('major', major);
   user.set('resHall', resHall);
   user.signUp().then(user => {
      var sessionToken = user.getSessionToken();
      console.log('User signed up!');
   }).catch(error => console.log('Error: ', error));

   res.sendStatus(200);
});

app.get('/login', (req, res) => {
    fs.readFile("../frontend/login.html",'utf8',(err,data)=>{
        console.log('User logged in!');
        res.contentType("text/html");
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    const user = Parse.User.logIn(username, password)
       .then(usr => {
            console.log('Logged in!');
           res.sendStatus(200)
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
