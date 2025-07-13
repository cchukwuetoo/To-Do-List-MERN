import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB =  async (): Promise<void> => {
    try {
       const mongoUri: string = process.env.MONGO_URI || ''
       if (!mongoUri) {
        console.error('MONGO_URI environment variable is not defined')
        process.exit(1)
       }
       await mongoose.connect(mongoUri);
       console.log('Connected to MongoDB'); 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;