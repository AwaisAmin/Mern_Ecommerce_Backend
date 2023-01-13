const express = require("express");
const { addItemToCart } = require("../controllers/cartController.js");
const { requireSignin, userMiddleware } = require("../middlewares/index.js");

const router = express.Router();

router.post("/addtocart", requireSignin, userMiddleware, addItemToCart);

// router.get("/getcategory", getCategories);

module.exports = router;
