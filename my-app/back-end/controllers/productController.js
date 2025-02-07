const Product = require('../models/Product'); // Assuming you have a Product model

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Send back the list of products
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Return error if product not found
    }
    res.json({ product }); // Send the product details in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new product (For Farmers Only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      category,
      weight,
      availableDate,
      expirationDate,
      condition,
      unit,
      location,
      delivery,
      tags,
      phone, 
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields
    if (!name || !description || !price || !quantity || !category || !phone) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl,
      quantity,
      category,
      weight,
      availableDate,
      expirationDate,
      condition,
      unit,
      location,
      delivery,
      tags,
      phone, 
      farmerId: req.user.userId,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

