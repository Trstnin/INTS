import express from 'express';

const authRouter = express.Router();

authRouter.get('/', (req,res) =>{
 res.send("api is working")
})

export default authRouter