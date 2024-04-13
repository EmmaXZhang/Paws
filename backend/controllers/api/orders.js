const Order = require("../../models/order");

// create a order
//POST /api/orders
async function create(req, res) {
  try {
    res.send("add order items");
  } catch (error) {
    console.log("create an order", error);
  }
}

// Get logged-in user orders
// GET /api/orders/myorders

async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
}

// Get all orders
// GET /api/orders
// Private/Admin
async function getOrders(req, res) {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
}

export { create, getMyOrders, getOrders };
