/* eslint-disable no-undef */

const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const { protect, admin } = require("../../config/authorization");

// General users---------------------------
// POST /api/users/login
router.post("/login", usersCtrl.login);

// POST /api/users/logout
router.post("/logout", usersCtrl.logout);

// POST /api/users
router.post("/", usersCtrl.create);
//GET /api/users/profile
router.get("/profile", protect, usersCtrl.getUserProfile);
// PUT /api/users/profile
router.put("/profile", protect, usersCtrl.updateUserProfile);

// Admin users---------------------------
// //GET /api/users
// router.get("/", protect, admin, usersCtrl.getUsers);
// //DELETE /api/users/:id
// router.delete("/:id", protect, admin, usersCtrl.deleteUser);
// // GET /api/users/:id
// router.get("/:id", protect, admin, usersCtrl.getUserById);
// //PUT /api/users/:id
// router.put("/:id", protect, admin, usersCtrl.updateUser);

module.exports = router;
