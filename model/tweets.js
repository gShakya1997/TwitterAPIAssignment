const mongoose = require("mongoose");
const tweetSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    tweet:{
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