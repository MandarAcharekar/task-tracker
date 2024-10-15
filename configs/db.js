const moongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await moongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected: Host Name - ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: MongoDB Connection Failed - ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;