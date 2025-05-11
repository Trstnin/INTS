import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Group',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user', //who sent the message
        required:true,
    },
    messageContent: {
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