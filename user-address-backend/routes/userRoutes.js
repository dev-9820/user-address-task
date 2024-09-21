const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Address = require('../models/addressModel');

// POST route to add user and address
router.post('/register', async (req, res) => {
  try {
    const { name, address } = req.body;

    const newUser = new User({ name });
    await newUser.save();

    const newAddress = new Address({ address, user: newUser._id });
    await newAddress.save();

    res.status(201).json({ message: 'User and address saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET route to fetch all users and their addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find().populate('user', 'name');

    // Check if addresses are being fetched from the database
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: 'No users or addresses found' });
    }

    const data = addresses.map((entry) => ({
      name: entry.user ? entry.user.name : 'Unknown User',
      address: entry.address,
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error in the server console
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
