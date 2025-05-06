import mongoose from "mongoose";

const connectDb = async() =>{
     try {
         const connect = await mongoose.connect(process.env.MONGODB_URI);
         if(connect){
            console.log("Connected to db");
         }

     } catch (error) {
         console.log("Trouble connecting to db")
     }
}

export default connectDb