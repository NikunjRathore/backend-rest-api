const mongoose = require("mongoose")

// connection establishment

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/mydata");
        console.log("Mongo connected")
    }catch(err){
        console.error(`Mongo connection error: ${err.message || err}`);
    }
}

module.exports = { connectDB };
