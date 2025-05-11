import joinedGroup from "../models/joinedGroupModel.js";
import Group from "../models/groupModel.js";

export const newlyJoinedGroup = async (req, res) => {
   const { group, user } = req.body;

   try {
      //optional : check if user alredy belongs to the group.
      const alreadyJoined = await joinedGroup.findOne({ user, group });

      if (alreadyJoined) {
         return res.status(400).json({ message: "User already joined this group" });
      }

      //optional: check if group exists:

      const groupExists = await Group.findById(group);
      if (!groupExists) {
         return res.status(404).json({ message: "Group not found" });
      }

      //saving the new group members
      const newJoin = new joinedGroup({ user, group });
      await newJoin.save();

      res.status(201).json({ message: "Group joined successfully" });

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error Joining group" });
   }
}

export const getJoinedGroup = async (req, res) => {
   const { userId } = req.query;
   if (!userId) return res.status(400).json({ message: "userId required" });

   try {
      //Fetch all the groups the user is part of by looking for userid in the joinedGroup model
      const joined = await joinedGroup.find({ user: userId })
         

      //Return the joined group data
      res.json(joined);
   } catch (error) {
       console.log(error);
       res.status(500).json({message: 'Failed to fetch joined groups '});
   }
};

export const leaveJoinedGroup = async (req,res) => {
   const {user, group} = req.body;

   if(!user || !group){
      return res.status(400).json({error: "Missing user or group"});
   }
   try {
      
   //Find and remove the user from the joined group
   const removeGroup = await joinedGroup.findOneAndDelete({user,group});

   if(!removeGroup){
      return res.status(404).json({message: "User is not a member of this group "});
   }
     res.status(200).json({message: "Left group successfully"});

   } catch (error) {
      console.log("Error leaving group:", error);
      res.status(500).json({message: "Internal server error"});
   }
};