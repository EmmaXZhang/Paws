const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");
const { protect, admin } = require("../../config/authorization");

//General users---------------------------

//POST /api/orders
router.post("/", protect, ordersCtrl.create);

//GET /api/orders/myorders
router.get("/myorders", protect, ordersCtrl.getMyOrders);

// GET /api/orders/:id
router.get("/:id", protect, ordersCtrl.getOrderById);

// PUT /api/orders/:id/pay
router.put("/:id/pay", protect, ordersCtrl.updateOrderToPay);

//Admin users---------------------------
//GET /api/orders
router.get("/", protect, admin, ordersCtrl.getOrders);

// //PUT /api/users/:id/deliver
router.put("/:id/deliver", protect, admin, ordersCtrl.updateOrderToDeliver);

module.exports = router;
