const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/api/products");
// const upload = require("../../utils/multer");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/productss/new
router.post("/new", upload.single("image"), productsCtrl.create);

// GET /api/products
router.get("/", productsCtrl.index);

// // DELETE /api/products/:id
// router.delete("/:id", productsCtrl.delete);

// GET /api/products/:id
router.get("/:id", productsCtrl.show);

// // PUT /api/products/:id/edit
// router.put("/:id", productsCtrl.update);

module.exports = router;
