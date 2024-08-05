import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://root:example@mongodb:27017/mydatabase';
// const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    } else {
      console.error('Unexpected error:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
