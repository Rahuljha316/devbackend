const express = require('express')

const app = express();
app.use("/test",(req,res) => {
    res.send('hello world')
})

app.listen(7777, ( ) => {
    console.log(`app is listing at port ${7777}` )
});