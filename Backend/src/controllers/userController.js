import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

    const { FirstName, LastName, Password, Email,avatarUrl} = req.body

    if (!FirstName || !Email || !Password || !LastName) {
        return res.json({ success: false, message: "Invalid data is provided !!!" });
    }

    if(avatarUrl === ''){
        avatarUrl = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png"
    }

    try {

        const ExistingUser = await userModel.findOne({ Email });
        if (ExistingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 12);

        const user = await userModel.create({
            FirstName,
            LastName,
            Email,
            Password: hashedPassword,
            avatarUrl
        })

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            htttpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: (process.env.NODE_ENV === 'production') ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


     return res.json({success:true});

    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

export const login = async (req,res) => {
    const {Email,Password} = req.body

    if(!Email || !Password){
       return res.json({success:false, message:"Invalid data entry !!!"});
    }

    try {
   const user = await userModel.findOne({Email});

   if(!user){
    return res.json({success:false, message:"Invalid Email !!!"});
   }

   const isMatch = bcrypt.compare(Password,user.Password);

   if(!isMatch){
    return res.json({success:false , message:"Invalid Password"})
   }

 const token = jwt.sign({id:user._id }, process.env.JWT_SECRET ,{
    expiresIn:'7d'
 })

   res.cookie("token", token ,{
    htttpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production')?"none":"strict"
   })
 
 
   return res.json({success:true});

        
    } catch (error) {
         res.json({message:error.message , success:false});
         console.log(error)
    }
}