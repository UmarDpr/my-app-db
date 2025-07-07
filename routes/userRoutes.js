// routes/userRoutes.js
const express = require('express');
const router = express.Router(); 
const User = require('../models/user');

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = new User({ name: req.body.name, email: req.body.email });
    const savedUser = await user.save();
    res.status(201).json({ message: 'User saved', data: savedUser });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user', details: err });
  }
});

// GET /api/users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
