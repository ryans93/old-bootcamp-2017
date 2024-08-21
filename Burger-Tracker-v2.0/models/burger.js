module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        devouredBy: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "a stranger"
        }
    });

    return Burger;
};