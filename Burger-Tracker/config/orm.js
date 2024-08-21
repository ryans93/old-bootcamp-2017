var connection = require("./connection.js");

var orm = {
    selectAll: function (table, cb) {
        connection.query("SELECT * FROM ??", [table], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function (table, column, values, cb) {
        connection.query("INSERT INTO ?? (??) VALUES (?)", [table, column, values], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function (table, obj, condition, id, cb) {
        connection.query("UPDATE ?? SET ? WHERE ?? = ?", [table, obj, condition, id], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;