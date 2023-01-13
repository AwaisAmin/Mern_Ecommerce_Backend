const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      username: Math.random().toString(),
      email,
      password,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created successfully",
        });
      }
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role, email: user.email },
          process.env.JWT,
          {
            expiresIn: "4h",
          }
        );

        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
