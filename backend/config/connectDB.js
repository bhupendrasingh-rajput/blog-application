const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully!')
    } catch (error) {
        console.log('Error Connecting Database! \n', error)
    }
}

module.exports = connectDB;