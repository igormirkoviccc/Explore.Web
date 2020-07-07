const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Roles = require('../../enum/roles');



var UserSchema = new mongoose.Schema({
        name: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            unique: true,
            // required: true,
            validate(value) {
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid');
                }
            }
        },
        img:{
            type: String,
            // required: true,
            default: "https://picsum.photos/200"
        },
        password : {
            type: String,
            // required: true
        },
        gender: {
            type: String,
            // required: true
        },
        birthday: {
            type: Date
            // required: true
        },
        role: {
            type: String,
            // required: true,
            enum: Roles
    },
    },{
        timestamps: true
    }
);

UserSchema.methods.generateAuthToken = async function() {
    return jwt.sign({email: this.email, role: this.role}, 'secret123123');
}

UserSchema.statics.findByCredentials = async (email, password) =>{
    try{
        const user = await User.findOne({email});
        // if(!await bcrypt.compare(password,user.password)){
        //     throw new Error('Wrong password');
        // }else if(!user){
        //     throw new Error('Please, sign up');
        // }
        return user;
    }catch (e) {
        throw new Error(e);
    }

}

const User = mongoose.model('User', UserSchema);

module.exports = User
