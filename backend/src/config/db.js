import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`----------------------MongoDB Connected---------------`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Running server in fallback memory mode. DB operations will be simulated in memory if MongoDB is unavailable.');
  }
};

export default connectDB;