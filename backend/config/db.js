const mongoose = require("mongoose");
const dbuser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {

    try {
        mongoose.set('strictQuery', false);
        const dbConn = await mongoose.connect(`mongodb+srv://${dbuser}:${dbPassword}@cluster0.ndkp11n.mongodb.net/?retryWrites=true&w=majority`);
        
        console.log("Conectou ao banco!");
        return dbConn;
    } catch (error) {
        console.log(error);
    }

}

conn();

module.exports = conn;