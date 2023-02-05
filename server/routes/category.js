const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/auth");
const {
  create,
  update,
  remove,
  list,
  read,
} = require("../controllers/categoryControllers");
const router = express.Router();

router.post("/", requireSignIn, isAdmin, create);
router.put("/:id", requireSignIn, isAdmin, update);
router.delete("/:id", requireSignIn, isAdmin, remove);
router.get("/", list);
router.get("/:slug", read);
module.exports = router;
