const products = require("../../data/products");

async function index(req, res) {
  res.json(products);
}

async function show(req, res) {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
}

module.exports = {
  index,
  show,
};
