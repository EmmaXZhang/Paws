const Product = require("../../models/product");

// fetch all product
async function index(req, res) {
  try {
    //query string name->category
    const { petCategory } = req.query;

    const filter = petCategory ? { petCategory } : {};

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

// create a product
async function newProduct(req, res) {
  try {
    const { name, price, image, description, brand, category, petCategory, countInStock, cloudinaryId } = req.body;

    console.log("request", req.body);

    if (!name || !price || !image || !description || !brand || !category || !petCategory || !countInStock) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const product = new Product({
      user: req.user._id,
      name: name,
      image: image,
      cloudinary_id: cloudinaryId,
      brand: brand,
      category: category,
      petCategory: petCategory,
      description: description,
      price: price,
      countInStock: countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log("create new product", error);
    throw error;
  }
}

// update a product
async function update(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    const { name, price, description, image, brand, category, petCategory, countInStock } = req.body;
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.petCategory = petCategory;
      product.countInStock = countInStock;

      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log("update a product", error);
  }
}

// delete a product
async function deleteProduct(req, res) {
  try {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: "product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log("delete a product", error);
  }
}

module.exports = {
  index,
  show,
  new: newProduct,
  update,
  delete: deleteProduct,
};
