const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const router = express.Router();
// const auth = require('../auth');

//register

router.post("/register", (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 7, function (err, hash) {
        if (err) {
            throw new Error("Could not hash");
        }
        User.create({
            name: req.body.name,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            image: req.body.image
        })
            .then((user) => {
                let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                res.json({
                    status: "Registered Succuessfully!",
                    token: token
                });
            })
            .catch(next);
    });
});

//login
router.post("/login", (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error("Password doesn't match. Try again!");
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: user._id,
                        },process.env.SECRET);
                        res.json({
                            status:"Login successful",
                            token:token
                        });
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;