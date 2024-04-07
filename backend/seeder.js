const mongoose = require("mongoose");
const dotenv = require("dotenv");

const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/ordrer");

dotenv.config();
require("./config/database");

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("data imported");

    process.exit();
  } catch (error) {
    `${error}`;
  }
  process.exit(1);
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

// conditionally import or destroy data on script
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
