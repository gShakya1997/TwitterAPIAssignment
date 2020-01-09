const express = require("express");
const mongoose = require("mongoose"); //database
const userRouter = require('./routes/users');
const dotenv = require('dotenv').config(); //To make secure
// const uploadRouter = require('./routes/upload');
// const auth = require('./auth');
const cors = require('cors'); //Cross Origin

const app1 = express();
app1.use(express.json());
app1.use(express.urlencoded({extended: true}));
app1.use(express.static(__dirname + "/public"));

//routes
app1.use("/users",userRouter);

//Database config
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Connected to MongoDB server");
    }, (err) => console.log(err));

app1.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});

//Error Handler
app1.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});
