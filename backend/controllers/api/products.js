const Product = require("../../models/product");

// fetch all product
async function index(req, res) {
  try {
    console.log("req.user", req.user);
    //query string name->category
    const { category } = req.query;
    const filter = category ? { petCategory: category } : {};
    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    console.log("display all product", error);
  }
}

//fetch one product
async function show(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log("display a product", error);
  }
}

module.exports = {
  index,
  show,
};
