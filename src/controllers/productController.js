const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/v1/products
exports.getProducts = async (req, res, next) => {
  try {
    // Implementing basic pagination and filtering
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const query = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find(query)
      .skip(startIndex)
      .limit(limit)
      .lean(); // .lean() improves performance by returning plain JS objects

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error); // Passes the error to the global error handler in server.js
  }
};

// @desc    Create a new product
// @route   POST /api/v1/products
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
