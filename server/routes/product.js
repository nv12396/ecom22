const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/auth");
const {
  create,
  list,
  read,
  photo,
  remove,
} = require("../controllers/productControllers");
const formidable = require("express-formidable");

const router = express.Router();

router.post("/", requireSignIn, isAdmin, formidable(), create);
router.delete(
  "/delete/:productId",
  requireSignIn,
  isAdmin,
  formidable(),
  remove
);
router.get("/all", list);
router.get("/:slug", read);
router.get("/photo/:productId", photo);

module.exports = router;
