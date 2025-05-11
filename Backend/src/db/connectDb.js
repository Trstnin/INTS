import mongoose from "mongoose";
import Group from "../models/groupModel.js";
import path from 'path';
import fs from 'fs';

const data = JSON.parse(
  fs.readFileSync(path.resolve('./src/startups.json'), 'utf-8')
);


const connectDb = async() =>{
     try {
         const connect = await mongoose.connect(process.env.MONGODB_URI);
         if(connect){
            console.log("Connected to db");
            await Group.deleteMany({});
            await Group.insertMany(data);
            console.log("Group seeded succesfully")
         }

     } catch (error) {
         console.log("Trouble connecting to db")
     }
}

export default connectDb