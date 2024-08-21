var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function (req, res) {
    db.Burger.findAll({
        order: [["burger_name", "ASC"]]
    }).then(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/", function (req, res) {
    db.Burger.create({
        burger_name: req.body.burger_name
    }).then(function () {
        res.redirect("/");
    });
});

router.put("/:id", function (req, res) {
    var devoured = {
        devoured: true,
        devouredBy: req.body.customer_name
    };
    db.Burger.update(devoured, {
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.redirect("/");
    });
});

router.get("/api", function (req, res) {
    db.Burger.findAll({
        order: [["burger_name", "ASC"]],
        include: [db.Customer]
    }).then(function (data) {
        res.json(data);
    });
});


module.exports = router;