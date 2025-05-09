import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';

const animals = JSON.parse(
  fs.readFileSync(path.resolve('./src/animal_images.json'), 'utf-8')
);



const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  avatarUrl: {
    type: String,
    default: () => findingAvatar()
  },  googleId: {
    type: String,
    sparse: true // this field is needed for OAuth logic
  },
});

// Add compound index for Email and googleId
userSchema.index({ Email: 1, googleId: 1 }, { sparse: true });

const userModel = mongoose.model("user", userSchema);


function findingAvatar(){
  const index= Math.floor(Math.random() * animals.length);
  return animals[index].image_url 
}

export default userModel;
