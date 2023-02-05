const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

// testing purpose
const secret = async (req, res) => {
  return res.json({ message: "Hi admin" });
};

module.exports = { requireSignIn, isAdmin, secret };
