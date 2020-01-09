const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    email:{
        type: String,
        required: true
    },
    image:{
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);