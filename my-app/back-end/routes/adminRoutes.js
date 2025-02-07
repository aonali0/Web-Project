// adminRoutes.js
const express = require('express');
const argon2 = require('argon2'); // Import argon2 for password hashing
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Ensure Admin model is correctly defined
const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Admin login attempt for email:', email); // Debugging log

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found:', email); // Debugging log
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Check if password matches using argon2
    const isMatch = await argon2.verify(admin.password, password);  // Use argon2 to compare the password
    if (!isMatch) {
      console.log('Invalid password attempt for admin:', email); // Debugging log
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your_secret_key', // Use an env variable
      { expiresIn: '1h' }
    );

    console.log('Admin logged in successfully'); // Debugging log
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
