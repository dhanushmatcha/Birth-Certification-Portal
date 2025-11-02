const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // Use environment variable or fallback

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  console.log('Registering user...');
  const { name, email, password, role, facilityId } = req.body;

  // Input validation (basic example)
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected');
      return res.status(503).json({ msg: 'Database connection error. Please try again later.' });
    }

    let user = await User.findOne({ email });

    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'parent', // Default to parent if no role provided
      ...(role === 'doctor' && { facility: facilityId }),
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    console.log('User registered successfully:', user.email);

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          return res.status(500).json({ msg: 'Error generating token. Please try again.' });
        }
        console.log('JWT token generated successfully');
        res.json({ 
          token, 
          user: { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role,
            ...(user.role === 'doctor' && { facility: user.facility }) 
          } 
        });
      }
    );
  } catch (err) {
    console.error('Server error during registration:', err);
    res.status(500).json({ msg: err.message || 'Server error during registration. Please try again.' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for email:', email);

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter both email and password' });
  }

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected');
      return res.status(503).json({ msg: 'Database connection error. Please try again later.' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log('User found:', user.email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Password mismatch for user:', user.email);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log('Password matched for user:', user.email);
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          return res.status(500).json({ msg: 'Error generating token. Please try again.' });
        }
        console.log('JWT token generated successfully for user:', user.email);
        res.json({ 
          token, 
          user: { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role,
            ...(user.role === 'doctor' && { facility: user.facility })
          } 
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: err.message || 'Server error during login. Please try again.' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ msg: 'Logged out successfully' });
});

module.exports = router;

