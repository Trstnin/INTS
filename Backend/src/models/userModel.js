import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    avatarUrl:{
        type:String,
        default:'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png'
    }
})

const userModel = mongoose.model('user', userSchema);

export default userModel;