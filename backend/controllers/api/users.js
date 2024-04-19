/* eslint-disable no-undef */
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//AuthorisedUser
//POST /api/users/login
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      //generate Token
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

// Logout user / clear cookie
// POST /api/users/logout
function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
}

// RegisterUser
// POST /api/users
async function create(req, res) {
  try {
    const { name, email, password } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

// getUser Profile
// GET /api/users/profile
async function getUserProfile(req, res) {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}

//helper function
function generateToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
  });
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

module.exports = {
  login,
  logout,
  create,
  getUserProfile,
  checkToken,
};
