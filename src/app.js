const express = require('express')
const connectDB = require('./config/connection')
const app = express();

connectDB()
    .then(() => {
        console.log('connected to the database')
        app.listen(7777, ( ) => {
            console.log(`app is listing at port ${7777}` )
        });
    })
    .catch(( ) => {
        console.error("connection to the database failed")
    });

