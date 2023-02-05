const express = require("express");
const router = express.Router();
const AuthApi = require("./auth");

router.use("/auth", AuthApi);

module.exports = router;
