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
    }
})

const userModel = mongoose.model('user', userSchema);

export default userModel;