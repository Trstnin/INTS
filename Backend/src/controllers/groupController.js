import Group from "../models/groupModel.js"


export const getAllGroups = async (req,res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        console.error("Failed to get groups:", error);
        res.status(500).json({message: "Server error"});
    }
}