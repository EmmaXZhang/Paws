const cloudinary = require("../../utils/cloudinary");

async function upload(req, res) {
  // Check if file was uploaded
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const imageUrl = await cloudinary.uploader.upload(req.file.path);

    res.json(imageUrl);
  } catch (error) {
    console.log("upload image", error);
  }
}

module.exports = { upload };
