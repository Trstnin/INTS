import mongoose from "mongoose";

const blacklsitTokenSchema = new mongoose.Schema({
     token:{
        type: String,
        required: true,
        unique: true
     },

     createdAt:{
        type:Date,
        default:Date.now,
        exprires:86400
     }
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklsitTokenSchema);

export default BlacklistToken