const validator = require('validator')

const validateSignUpData = (req) =>{
    const { firstName, lastName, password, email} = req.body
    if(!firstName){
        throw new Error('firstname is not valid')
    }
    if(!validator.isEmail(email)){
        throw new Error('enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('enter a strong password')
    }
}

module.exports = {
    validateSignUpData
}