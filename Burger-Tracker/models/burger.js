var orm = require("../config/orm.js");

var burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    insertOne: function (name, cb) {
        orm.insertOne("burgers", "burger_name", name, function (res) {
            cb(res);
        });
    },
    updateOne: function (id, cb) {
        var obj = {
            devoured: true
        };
        var condition = "id";
        orm.updateOne("burgers", obj, condition, id, function (res) {
            cb(res);
        });
    },
}

module.exports = burger;