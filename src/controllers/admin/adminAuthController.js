const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      username: Math.random().toString(),
      email,
      password,
      role: "admin",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created Successfully",
        });
      }
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          process.env.JWT,
          {
            expiresIn: "4h",
          }
        );

        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "4h" });
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

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out Successfully",
  });
};
