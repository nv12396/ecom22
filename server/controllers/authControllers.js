const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user Exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User already exist" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // register user
    const user = await new User({
      email,
      name,
      password: hashedPassword,
    }).save();

    // crete signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        email: user.email,
        name: user.email,
        role: user.role,
        adress: user.adress,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // check if user Exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User does not exist, please register" });
  }
  //compare hashed password
  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return res.status(406).json({ message: "Credential not found" });
  }
  // crete signed jwt
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({
    message: "succesfully logged in ",
    token,
    user: {
      email: user.email,
      name: user.name,
      adress: user.adress,
      role: user.role,
    },
  });
};

module.exports = { register, login };
