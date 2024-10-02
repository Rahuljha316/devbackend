const mongoose = require("mongoose")

const connectDB = async ( ) => {
   await mongoose.connect("mongodb+srv://rahulbudy11:bxsIzrBAcvoeDvBd@cluster0.ou29t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}
module.exports = connectDB;
