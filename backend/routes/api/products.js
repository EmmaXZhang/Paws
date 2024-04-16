const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/api/products");
const { protect, admin } = require("../../config/authorization");

// POST /api/products/new
router.post("/new", protect, admin, productsCtrl.new);

// GET /api/products
router.get("/", productsCtrl.index);

// // DELETE /api/products/:id
// router.delete("/:id", productsCtrl.delete);

// GET /api/products/:id
router.get("/:id", productsCtrl.show);

// // PUT /api/products/:id/edit
// router.put("/:id", productsCtrl.update);

module.exports = router;
