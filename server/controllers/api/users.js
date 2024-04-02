/* eslint-disable no-undef */
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//for handling HTTP requests related to user creation in a RESTful API.
async function create(req, res) {
  try {
    //The create() function is to handle the creation of a new user.
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

//helper function
function createJWT(userData) {
  //sign (in jsonwebtoken library) -> create JWTs
  const syncToken = jwt.sign(
    // data payload
    { user: userData },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
  console.log("syncToken", syncToken);
  return syncToken;
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    //user we need to query for the user based upon their email
    //and then verify the password is correct using bcrypt’s compare method.
    const user = await User.findOne({ email });

    if (!user) throw new Error("invalid email or password");

    //compare password to hashed password (user.password)
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "invalid email or password" });
    }
    //if match, send back JWT token
    res.json(createJWT(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

module.exports = {
  create,
  login,
  checkToken,
};
