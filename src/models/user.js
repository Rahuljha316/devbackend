const mongoose = require('mongoose')
var validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength:50,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength:50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minLength: 7,
        maxLength:50,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('not a valid email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength:8,
        maxLength: 200,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error('password is weak')
            }
        }
    },
    age: {
        type: Number,
        min: 14,
        max: 70
    },
    gender: {
        type: String,
        
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error('not a valid gender')
            }
        }  
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "this is the default about of the user"
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;