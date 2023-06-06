


const User = require('../models/superUserModel.js')

const router = require('express').Router()

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/register',async(req,res)=>{
    try {
     // check if user already exists
     const users = await User.find({})

     if(users.length > 0){
        return res.status(400).json({message:"Account creation is prohibited by Manish",success:false})
     }

     const userExists = await User.findOne({email:req.body.email});

     if(userExists){
        throw new Error("User already exists")
     }

     req.body.password = await bcrypt.hash(req.body.password,10)
     
     await User.create(req.body)
     res.status(201).json({message:"User registered successfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})


router.post('/login',async(req,res)=>{
    try {
        // check if user exists
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("User does not exist")

            }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)

    if(!isPasswordCorrect) {
        throw new Error("Password is incorrect")
    }

    //create token
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"1d",

    });

    res.status(200).json({
        message:"User logged in successfully",
        success:true,
        data:token
    })
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      res.status(200).json({
        message: "User fetched successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  });


module.exports = router