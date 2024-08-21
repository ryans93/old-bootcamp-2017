const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Must enter username"],
        unique: [true, "Username not available"],
        minlength: [6, "Username must be at least 6 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"],
    },
    password: {
        type: String,
        required: [true, "Must enter password"],
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [30, "Password cannot exceed 30 characters"],
    },

    weight: {
        type: Number,
        required: [true, "Must enter weight"],
        min: [50, "Weight must be at least 50 lbs."],
        max: [500, "Weight must be below 500 lbs."],
    },
    age: {
        type: Number,
        required: [true, "Must enter age"],
        min: [0, "Age must be at least 0"],
        max: [99, "Age must be less than 99"],
    },
    sensCo: {
        type: Number,
        required: [true, "Must enter sensitivity coefficient"],
        min: [.18, "Invalid: must be at least .18"],
        max: [.55, "Invalid: must be less than .55"],
    },
    ic: {
        type: Number,
    },
    ip: {
        type: Number,
    },
    bsRaise: {
        type: Number,
    },
    cf: {
        type: Number,
    },
    lowLimit: {
        type: Number,
        default: 70,
        min: [60, "Low limit cannot be set lower than 60"],
        max: [120, "Low limit cannot be set higher than 120"],
    },
    highLimit: {
        type: Number,
        default: 180,
        min: [100, "High limit cannot be set lower than 100"],
        max: [300, "High limit cannot be set higher than 300"],
    },
    targetBG: {
        type: Number,
        default: 100,
        min: [80, "Target blood sugar cannot be set lower than 80 mg/dL"],
        max: [200, "Target blood sugar cannot be set greater than 200 mg/dL"],
    },
    exerCo: {
        type: Number,
        default: 1,
        min: [0.33, "Exercise coefficient cannot be set lower than 0.33"],
        max: [1.25, "Exercise coefficient cannot be set higher than 1.25"],
    },
    errorMargin: {
        type: Number,
        default: 10,
        min: [0, "Error margin cannot be set lower than 0%"],
        max: [25, "Error margin cannot be set higher than 25%"],
    },

    countProtein: {
        type: Boolean,
        default: false,
    },
    hyperAdj: {
        type: Boolean,
        default: false,
    },
    meals: [{
        name: {
            type: String,
            unique: [true, "Name already taken."],
            required: [true, "Must enter a unique name"],
            maxlength: [20, "Name cannot exceed 20 characters"]
        },
        category: {
            type: String,
            default: "-",
        },
        foods: {
            type: String,
            default: "-",
        },

        carbs: {
            type: Number,
            required: [true, "Must enter carb amount"],
            min: [-1, "Invalid carb entry"],
            max: [500, "Must enter below 500 grams carbs"],
        },
        protein: {
            type: Number,
            required: [true, "Must enter protein amount"],
            min: [-1, "Invalid protein entry"],
            max: [300, "Must enter below 300 grams protein"],
        },
        fat: {
            type: Number,
            required: [true, "Must enter fat amount"],
            min: [-1, "Invalid fat entry"],
            max: [300, "Must enter below 300 grams fat"],
        },
    }],
    records: [{
        date: {
            type: Date,
            default: Date.now,
        },
        bloodSugar: {
            type: Number,
            required: [true, "Must enter blood sugar"],
            min: [10, "Blood sugar must be at least 10 mg/dL"],
            max: [800, "Blood sugar must be less than 800 mg/dL"],
        },

        carbs: {
            type: Number,
            default: -1,
            min: [-1, "Invalid carb entry"],
            max: [500, "Must enter below 500 grams carbs"],
        },
        protein: {
            type: Number,
            default: -1,
            min: [-1, "Invalid protein entry"],
            max: [300, "Must enter below 300 grams protein"],
        },
        fat: {
            type: Number,
            default: -1,
            min: [-1, "Invalid fat entry"],
            max: [300, "Must enter below 300 grams fat"],
        },

        insulin: {
            type: Number,
            default: -1,
            min: [-1, "Invalid insulin entry"],
            max: [100, "Max insulin exceeded, must be below 100 units"],
        },
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;