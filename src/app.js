const express = require('express')
const connectDB = require('./config/connection');
const User = require('./models/user');
const app = express();

app.use(express.json())

app.get('/feed', async (req, res) => {
    try{
        const user = await User.find({})
        if(user.length ===0){
            res.status(404).send('Users not found')
        }else{
            res.status(200).send(user);
        }
    }catch(error){
        res.status(400).send('Error while fetching feed' , error)

    }
});

app.get('/user', async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email: email});
        if(user.length ===0 ){
            res.status(404).send('user with the give email not found')
        }else {
            res.status(200).send(user)
        }
    }catch(error){
        res.status(400).send('Error while fetching ' , error)

    }
})

app.post('/signUp', async ( req, res ) => {
    
    const user = new User(req.body);

    try{
        await user.save();
        res.status(200).send('SuccessFully added the user to the database')
    }catch(error){
        res.status(400).send('Error while inserting in database' , error)
    }
})
app.delete('/deleteById', async ( req, res ) => {
    const id = req.body.id;
    try{
        const user = await User.findByIdAndDelete(id, {returnDocument : 'before'})
        console.log(user)
        res.status(200).send('deleted successfully')
    }catch(error){
        res.status(400).send('Error while deleting' , error)
    }
})
app.delete('/deleteByEmail', async ( req, res ) => {
    const email = req.body.email;
    try{
        console.log(email)
        const user = await User.findOneAndDelete(email)
        console.log(user)
        res.status(200).send('deleted successfully')
    }catch(error){
        res.status(400).send('Error while deleting' , error)
    }
})
app.patch('/updateUser', async ( req, res ) => {
    const data = req.body;
    const email = req.body.email;
    try{
        console.log(email)
        const user = await User.findOneAndUpdate({email:email},data, {returnDocument: 'after'})
        console.log(user)
        if(user.length ===0){
            res.status(400).send('not found')
        }
        res.status(200).send('updated successfully')
    }catch(error){
        res.status(400).send('Error while updating')
    }
})
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

