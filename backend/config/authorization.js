const jwt = require("jsonwebtoken");
const User = require("../models/user");

//protect routes that require authentication
async function protect(req, res, next) {
  // Read JWT from the 'jwt' cookie
  let token = req.cookies.jwt;

  if (token) {
    try {
      //JWT secret stored in the environment variable process.env.JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decode token, and get user by id wihtout password info
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}

function admin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
}

module.exports = {
  admin,
  protect,
};
