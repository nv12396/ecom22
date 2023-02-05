const express = require("express");
const router = express.Router();
const AuthApi = require("./auth");
const CategoryApi = require("./category");
const ProductApi = require("./product");

router.use("/auth", AuthApi);
router.use("/category", CategoryApi);
router.use("/product", ProductApi);

module.exports = router;
