const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        minlength: 3,
        maxlength: 50
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type: String,
    },
    image:{
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);