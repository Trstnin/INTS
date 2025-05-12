import Message from '../models/messageModel.js';

export const sendMessage = async (req, res) => {
  try {
    const { group, sender, text } = req.body;

    // Validate input
    if (!group || !sender || !text) {
      return res.status(400).json({ message: "Missing required fields: group, sender, or text" });
    }

    // Create and save message
    const message = new Message({ group, sender, text });
    await message.save();

    // Optionally populate sender info if needed on frontend
    await message.populate('sender', 'name'); // adjust fields as needed

    // Emit the message using Socket.IO
    const io = req.app.get('io');
    console.log(io)
    if (io) {
      io.to(group).emit('receive-message', {
        _id: message._id,
        group: message.group,
        sender: message.sender,
        text: message.text,
        createdAt: message.createdAt,
      });
    } else {
      console.error("Socket.IO instance not found");
    }
     
    // Respond with message
    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
};


export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch messages for the given group from the database
    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: 1 }); // Sort messages in ascending order based on creation time

    res.status(200).json(messages); // Respond with the messages
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};
