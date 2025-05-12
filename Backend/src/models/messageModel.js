import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'joinedGroup',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user', //who sent the message
        required:true,
    },
    text: {
        type:String,
        required:true,
    },
    timestamp: {
        type:Date,
        default: Date.now
    }
});

const Message = mongoose.model('message', messageSchema);
export default Message;