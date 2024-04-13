const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");
const { protect, admin } = require("../../config/authorization");

//General users---------------------------

//POST /api/orders
router.post("/", protect, ordersCtrl.create);

//GET /api/orders/myorders
router.get("/myorders", protect, ordersCtrl.getMyOrders);

//Admin users---------------------------
//GET /api/orders
router.get("/", protect, admin, ordersCtrl.getOrders);

// GET /api/orders/:id
router.get("/:id", protect, admin, ordersCtrl.getOrderById);

// //PUT /api/users/:id
// router.put("/:id", protect, admin, usersCtrl.updateUser);

module.exports = router;
