import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModal.js";

export const allProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("user", "name email");
  res.json(products);
});

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error("Product not found");
  }
};

const createProduct = asyncHandler(async (req, res) => {
  try {
    // const { file } = req;
    const newProduct = await Product.create(req.body);

    const createdProduct = await newProduct.save();

    if (createProduct) {
      res.status(201).json(createdProduct);
    }
  } catch (error) {
    res.status(401);
    throw new Error("try AGAIN !");
  }

  //   res.status(201).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(401);
    throw new Error("product not Found!");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProduct, createProduct, deleteProduct, updateProduct };
