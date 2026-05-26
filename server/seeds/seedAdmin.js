const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'gopalgawas2004@gmail.com' });
    if (existingAdmin) {
      console.log('Admin already exists. Skipping seed.');
      process.exit(0);
    }

    const admin = await Admin.create({
      name: 'HR Admin',
      email: 'gopalgawas2004@gmail.com',
      password: 'admin123',
    });

    console.log('✅ Admin created successfully:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: admin123`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();
