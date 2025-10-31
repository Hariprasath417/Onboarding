require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const FormEntry = require('./src/models/FormEntry');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await FormEntry.deleteMany({});
    console.log('Cleared existing data');

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: hashedPassword
    });
    await user.save();
    console.log('Created test user:', user.email);

    // Create sample form entry
    const formEntry = new FormEntry({
      userId: user._id,
      steps: new Map([
        ['1', {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          phoneNumber: '+1234567890'
        }],
        ['2', {
          streetAddress: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'US'
        }],
        ['3', {
          jobTitle: 'Software Engineer',
          company: 'Tech Corp',
          experience: '2-5'
        }],
        ['4', {
          primarySkills: 'JavaScript, React, Node.js',
          secondarySkills: 'Python, SQL, Docker',
          certifications: 'AWS Certified Developer'
        }],
        ['5', {
          educationLevel: 'bachelor',
          institution: 'University of Technology',
          fieldOfStudy: 'Computer Science',
          graduationYear: '2015'
        }],
        ['6', {
          workEnvironment: 'remote',
          industryInterests: ['Technology', 'Healthcare']
        }],
        ['7', {
          shortTermGoals: 'Become a senior developer',
          longTermGoals: 'Lead a development team',
          motivation: 'Building innovative solutions'
        }],
        ['8', {
          linkedinProfile: 'https://linkedin.com/in/johndoe',
          portfolioWebsite: 'https://johndoe.dev',
          additionalComments: 'Looking forward to new opportunities',
          agreeToTerms: true
        }]
      ]),
      completed: true,
      completedAt: new Date()
    });
    await formEntry.save();
    console.log('Created sample form entry');

    console.log('\n✅ Seeding completed successfully!');
    console.log('\nTest credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    console.log('\nYou can now login with these credentials to see the completed form.');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
