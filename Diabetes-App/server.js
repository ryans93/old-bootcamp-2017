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

app.use(express.static(path.join(__dirname, 'client', 'build')));

const User = require("./models/User.js");

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/DiabetesDB",
{
    useMongoClient: true
  });

const db = mongoose.connection;

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});


//api routes here

app.post("/api/newUser", function (req, res) { 
    let newUser = new User(req.body);
    console.log(newUser);
    newUser.save(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(doc);
        }
        res.send(doc);
    });
});

app.get("/api/getSettings", function (req, res) {
    User.findOne({}).exec(function (err, data) {
        if (err) {
            res.send(err);
        }
        res.send(data);
    })
});

app.post("/api/setSettings", function (req, res) {
    let newSettings = req.body;
    console.log(newSettings);
    User.findOneAndUpdate({}, { $set:  newSettings }, (err, results) =>{
        if (err) console.log(err);
        res.send(results);
    });
});

app.delete("/api/deleteUser", function (req, res) {
    User.findOneAndRemove({}, (err, results) =>{
        if (err) console.log(err);
        res.send(results);
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});