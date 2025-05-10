import joinedGroup from "../models/joinedGroupModel.js";

export
   const newlyJoinedGroup = async (req, res) => {
      const { group, user } = req.body

      try {
         //Optional: check if already joined:
         const alreadyJoined = await joinedGroup.findOne({ user: user, group });

         if (alreadyJoined) {
            return res.status(400).json({ message: "user already joined this group" });
         }

         //Save join:
         const newJoin = new joinedGroup({
            user, group
         })
         await newJoin.save();

         res.status(201).json({ message: 'Group joined successfully' });
      } catch (error) {
         console.log(error);
         res.status(500).json({ message: 'Error joining group' });
      }
   }

export const getJoinedGroup = async (req, res) => {
   const { userId } = req.query;
   if (!userId) return res.status(400).json({ message: 'userId required' });

   try {
      const joined = await joinedGroup.find({ user: userId });
      res.json(joined);

   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch joined group' });
   }
}

export const leaveJoinedGroup = async (req, res) => {
   const { user, group } = req.body;

   if (!user || !group) {
      return res.status(400).json({ error: "Missing user or group" });
   }

   try {
      const updatedGroup = await joinedGroup.findOneAndDelete(
         { group: group },
         { $pull: { members: user } },
         { new: true }
      );

      if (!updatedGroup) {
         return res.status(404).json({ error: "Group not found" });
      }

      res.status(200).json({ message: "Left group successfully", group: updatedGroup });

   } catch (error) {
      console.log("Error leaving group:", error);
      res.status(500).json({ error: "Internal server error" });
   }
}

