// db.ts
import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase');
        console.log('MongoDB connected');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error('Unexpected error', err);
        }
    }
};
export default connectDB;
