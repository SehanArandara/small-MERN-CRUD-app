const mongoose = require("mongoose")
require('dotenv').config();
mongoose.set('strictQuery', true);

async function ConnectDB(){
    try{
        await mongoose.connect(process.env.DB_URL) 
        console.log("connected to the data base")
    }catch(err) {
        console.log(err.message);
    }
    
}

module.exports = ConnectDB;