const express = require("express");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const { addProduct } = require("../controllers/productController.js");
const { requireSignin, adminMiddleware } = require("../middlewares/index.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  upload.array("productImage"),
  addProduct
);

// router.get("/getproducts", getProducts);

module.exports = router;
