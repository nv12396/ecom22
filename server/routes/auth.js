const express = require("express");
const { register, login } = require("../controllers/authControllers");
const { requireSignIn, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignIn, (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
