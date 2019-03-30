const express = require('express');
const app = express();
const fs = require("fs");
const parse = require('parse/node');
const port = 3000;

parse.initialize('1UL4z4XXj5lcw7FqCZQDi9AEY9oBaCLDU1hlLsDI', 'wCS800zhokit6qVVcY7dvJdunL0yAuIDKe2em9sV');
parse.serverURL = 'https://parseapi.back4app.com/';

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

app.get('/test', (req, res) => {
    var Advice = parse.Object.extend('Advice');
    var query = new parse.Query(Advice);
    query.find()
        .then(data => {
           res.send(data);
        });
})