import mongoose from 'mongoose';

const joinedGroupSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Group',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });

const joinedGroup = mongoose.model('joinedGroup', joinedGroupSchema);

export default joinedGroup