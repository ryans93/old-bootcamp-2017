var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static("public"));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_20gjfm5v:8fbjkvs9fh52f311i1gfk3slc1@ds117819.mlab.com:17819/heroku_20gjfm5v");
var db = mongoose.connection;

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

//routes
app.get("/", function (req, res) {
    Article.find({}).limit(20).exec(function (err, data) {
        if (err) {
            res.send(err);
        }
        var hbsObject = {
            data: data
        };
        res.render("index", hbsObject);
    })
});

app.get("/article/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    Article.findOne({ "_id": id }).populate({
        path: "comments",
        options: {
          sort: {
              "createdAt": -1
          }  
        }  
    }).exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        var hbsObject = {
            data: data
        };
        res.render("article", hbsObject);
    })
});

app.get("/api/scrape", function (req, res) {
    request("http://www.foxnews.com/", function (error, response, html) {
        var $ = cheerio.load(html);
        return new Promise(function (resolve, reject) {

            $("li", "#latest").each(function (i, element) {

                if ($(element).find("a").length === 1) {
                    var result = {};

                    result.title = $(element).children("a").text();
                    result.link = $(element).children("a").attr("href");

                    var entry = new Article(result);

                    entry.save(function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                else {
                    for (var index = 0; index < $(element).find("a").length; index++) {
                        var result = {};
                        result.title = $($(element).find("a")[index]).text();
                        result.link = $($(element).find("a")[index]).attr("href");
                        var entry = new Article(result);

                        entry.save(function (err, doc) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            });
            resolve(res.redirect("/"));
        });
    });
});

app.post("/api/newComment", function (req, res) {
    var commentObj = {
        author: req.body.author,
        body: req.body.body
    }
    var comment = new Comment(commentObj);

    comment.save(function (error, doc) {
        if (error){
            console.log(error);
        }
        Article.findOneAndUpdate({ "_id": req.body.id }, { $push: {"comments": doc._id} }, { new: true }, function (err, data) {
            res.send(data);
        });
    });
});

app.post("/api/comment/delete", function (req, res){
    Comment.remove({"_id":req.body.id},function (err, data){
        if(err) console.log(err);
        res.send(data);
    })
});

app.listen(PORT, function () {
    console.log("App running on port "+PORT+"!");
});
