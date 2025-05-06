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
    email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model('user', userSchema);

export default userModel;