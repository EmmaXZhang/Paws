const Order = require("../../models/order");

// create a order
//POST /api/orders
async function create(req, res) {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
    } else {
      const order = new Order({
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item._id,
          _id: undefined,
        })),
        paymentMethod,
        user: req.user._id,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  } catch (error) {
    console.log("create an order", error);
  }
}

// Get logged-in user orders
// GET /api/orders/myorders
async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}

// Get all orders
// GET /api/orders
async function getOrders(req, res) {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
}

//Get order by ID
// GET /api/orders/:id
async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate("user");

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
}

// update order to paid
// put /api/orders/:id/pay
async function updateOrderToPay(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();

      const paidOrder = await order.save();
      res.status(200).json(paidOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
}

//updateOrderToDeliver
// PUT /api/orders/:id/deliver
async function updateOrderToDeliver(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const deliveredOrder = await order.save();
      res.status(200).json(deliveredOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
}

// DELETE /api/orders/:id
async function deleteOrder(req, res) {
  try {
    const order = await Order.findById({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Order delete successfully", order });
  } catch (error) {
    console.log("delete order", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  create,
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderToPay,
  updateOrderToDeliver,
  deleteOrder,
};
