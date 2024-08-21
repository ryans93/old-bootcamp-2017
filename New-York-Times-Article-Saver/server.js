const express = require("express");
const request = require("request");
const mongoose = require('mongoose');
var path = require("path");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const Article = require("./models/Article.js");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/NYT-Search");
const db = mongoose.connection;

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

app.post("/api/search", function (req, res){
    let query=req.body;
    console.log(query);
    if(query.startYear=="") query.startYear="2017";
    if(query.endYear=="") query.endYear="2017";
    request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          'api-key': "5c4ec69429c34b70a6f1bca19f9cdabf",
          'q': query.topic,
          'begin_date': query.startYear+"0101",
          'end_date': query.endYear+"1231"
        },
      }, function(err, response, body) {
        body = JSON.parse(body);
        console.log(body);
        res.json(body);
      })
});

app.get("/api/saved", function (req, res) {
    Article.find({}).exec(function (err, data) {
        if (err) {
            res.send(err);
        }
        res.send(data);
    })
});

app.post("/api/saved", function (req, res) {
    console.log("in server js");
    let newArticle = new Article(req.body);
    newArticle.save(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(doc);
        }
        res.send(doc);
    });
});

app.delete("/api/saved/:id", function (req, res) {
    Article.remove({ "_id": req.params.id }, function (err, data) {
        if (err) console.log(err);
        res.send(data);
    })
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});