import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected: Host Name - ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: MongoDB Connection Failed - ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;