const mongoose = require('mongoose');
require('dotenv').config({path: 'enviroment.env'});

const connectDB = async () => {
    try {
        console.log('ENTRE111111')
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connected')
    } catch (e) {
        console.log(e);
        process.exit(1); //stop app
    }
}

module.exports = connectDB;