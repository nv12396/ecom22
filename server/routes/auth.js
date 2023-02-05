const express = require("express");
const { register, login } = require("../controllers/authControllers");
const { requireSignIn, isAdmin, secret } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// testing authorization
router.get("/secret", requireSignIn, isAdmin, secret);

module.exports = router;
