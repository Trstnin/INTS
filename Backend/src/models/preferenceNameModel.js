import mongoose from 'mongoose';

const preferenceNameSchema = new mongoose.Schema({
    preferenceName: {
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const PreferenceName = mongoose.model('preferenceName', preferenceNameSchema)
export default PreferenceName;