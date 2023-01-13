const express = require("express");
const { signup, login } = require("../controllers/authController");
const {
  validateSignupRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../validators/auth");

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/login", validateLoginRequest, isRequestValidated, login);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });

module.exports = router;
