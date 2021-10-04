const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.DB_URI;
const connectToMongo = async () => {
    try{
        if (!mongoURI) {
            throw new Error('auth DB_URI must be defined');
        }
    await mongoose.connect(mongoURI, () => {
        console.log('successfully connected to mongoDB');
    })
    } catch(error){
        console.log(error.message);
        res.send("Sorry for inconvinience, We are resolving the issue.")
    }
}

module.exports = connectToMongo;