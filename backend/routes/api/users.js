/* eslint-disable no-undef */
// routes/api/users.js

const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// GET //api/users/check-token
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

// General users---------------------------
// POST /api/users/login
router.post("/login", usersCtrl.login);
// POST /api/users
router.post("/", usersCtrl.create);
//GET /api/users/profile
router.get("/", usersCtrl.getUserProfile);
// PUT /api/users/profile
router.put("/profile", usersCtrl.updateUserProfile);

// Admin users---------------------------
//GET /api/users
router.get("/users", usersCtrl.getUsers);
//DELETE /api/users/:id
router.delete("/:id", usersCtrl.deleteUser);
// GET /api/users/:id
router.get("/:id", usersCtrl.getUserById);
//PUT /api/users/:id
router.put("/:id", usersCtrl.updateUser);

module.exports = router;
