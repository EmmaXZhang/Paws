const express = require("express");
const router = express.Router();
const upload = require("../../utils/multer");
const { protect, admin } = require("../../config/authorization");
const imageCtrl = require("../../controllers/api/images");

router.post("/", upload.single("image"), protect, admin, imageCtrl.upload);

module.exports = router;
