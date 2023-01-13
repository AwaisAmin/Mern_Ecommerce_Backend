const express = require("express");
const {
  signup,
  login,
  logout,
} = require("../../controllers/admin/adminAuthController");
const {
  validateSignupRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../../validators/auth");
const { requireSignin } = require("../../middlewares");

const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/admin/login", validateLoginRequest, isRequestValidated, login);

router.post("/admin/logout", logout);

module.exports = router;
