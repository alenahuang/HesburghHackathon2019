const express = require('express');
const app = express();
const fs = require("fs");
const Parse = require('Parse/node');
const port = 3000;

Parse.initialize('1UL4z4XXj5lcw7FqCZQDi9AEY9oBaCLDU1hlLsDI', 'wCS800zhokit6qVVcY7dvJdunL0yAuIDKe2em9sV');
Parse.serverURL = 'https://parseapi.back4app.com/';

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static('../frontend'))
// Routes
app.get('/', (req, res)=>{
    fs.readFile("../frontend/index.html",'utf8',(err,data)=>{
        res.contentType("text/html");
        res.send(data);
    })
})

app.get('/asdf', (req, res)=>{
    res.send("LOLSBEAUTIFUL")
})

app.get('/advices', (req, res) => {
    var Advice = Parse.Object.extend('Advice');
    var query = new Parse.Query(Advice);
    query.equalTo('section',req.params["category"])
    query.find()
        .then(data => {
           res.send(data);
        });
})

app.get('/reviews', (req, res) => {
    var Reviews = Parse.Object.extend('Reviews');
    var query = new Parse.Query(Reviews);
    query.equalTo('section',req.params["category"])
    query.find()
        .then(data => {
           res.send(data);
        });
})
