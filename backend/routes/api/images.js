const express = require("express");
const router = express.Router();
const upload = require("../../utils/multer");
const { protect, admin } = require("../../config/authorization");
const imageCtrl = require("../../controllers/api/images");

// /api/images/upload
router.post("/upload", upload.single("image"), protect, admin, imageCtrl.upload);

// /api/images/:id
router.delete("/:public_id", protect, admin, imageCtrl.delete);

module.exports = router;
