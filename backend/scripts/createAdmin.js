const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/birth');

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin@123', salt);

    const admin = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin@123');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

createAdmin();
