import mongoose  from "mongoose";

const groupSchema = new mongoose.Schema({
  name:String,
  description:String,
  website: String,
  industry:[String],
  location:String,
  funding:{
    rounds:Number,
    stage:String,
    investors:[String]
  },
  bgColor: String
});

const Group = mongoose.model("Group", groupSchema);
export default Group;