const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", (req, res) => {
    const { username, password } = req.body;
     
    User.find(
        {
            username: username,
        },
        (err, users) => {
            if (users.length !== 1) {
                return res.json({
                    success: false,
                    message: "Server Error",
                });
            }
            if (err) {
                return res.json({
                    success: false,
                    message: "Database Error",
                });
            } else {
                let user = user[0];
                if (user.validPassword(password)) {
                    // Do login logic with sessions
                    return res.json({
                        success: true,
                    });
                } else {
                    return res.json({
                        success: false,
                        message: "Invalid username or password",
                    });
                }
            }
        }
    );
});

router.get("/username_availability/:username", (req, res) => {
    const { username } = req.params;
    User.find(
        {
            username,
        },
        (err, users) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Database Error",
                });
            }
            if (users.length > 0) {
                return res.json({
                    success: false,
                    message: "User already exists with that username",
                });
            } else {
                return res.json({
                    success: true,
                });
            }
        }
    );
});

router.post("signup", (req, res) => {
    const { username, password } = req.body;
    User.find(
        {
            username,
        },
        (err, users) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Database Error",
                });
            }
            if (users.length > 0) {
                return res.json({
                    success: false,
                    message: "User already exists with that username",
                });
            } else {
                let u = new User();
                u.username = username;
                u.password = u.generateHash(password);
                u.save();
                return res.json({
                    success: true,
                });
            }
        }
    );
});

module.exports = router;
