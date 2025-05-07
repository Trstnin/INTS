import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
  },
  googleId: {
    type: String, 
    unique:true  // this field is needed for OAuth logic
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
