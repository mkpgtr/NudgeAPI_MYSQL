const authMiddleware = require('../middlewares/authMiddleware.js')
const User = require('../models/userModel.js')

const router = require('express').Router()

// create an user

router.post('/',authMiddleware,async(req,res)=>{

    try {
        await User.create(req.body)
        res.status(200).json({message:"User created Successfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
        
    }
})

// get all users

router.get('/',authMiddleware,async(req,res)=>{

    try {
        const users = await User.find({})
        res.status(200).json({data:users,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
        
    }
})

router.get('/:id',authMiddleware,async(req,res)=>{

    try {
        if(!req.params.id){
            return res.status(400).json({message:'please provide the id to search a user',success:false})
        }
        const foundUser = await User.findOne({_id:req.params.id})
        if(!foundUser){
            return res.status(404).json({message:'No user found',success:false})
        }

        const user = foundUser
        res.status(500).json({data:user,success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

//update user
router.put('/:id',authMiddleware,async(req,res)=>{

    try {
        if(!req.params.id){
            return res.status(400).json({message:'please provide the id to search a user',success:false})
        }
        const foundUser = await User.findOne({_id:req.params.id})
        if(!foundUser){
            return res.status(404).json({message:'No user found',success:false})
        }
        await User.findByIdAndUpdate(req.params.id,req.body)

        
        res.status(200).json({message:'user updated successfully',success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

// delete user 

router.delete('/:id',authMiddleware,async(req,res)=>{
    
    try {
        if(!req.params.id){
            return res.status(400).json({message:'please provide the id to search a user',success:false})
        }
        const foundUser = await User.findOne({_id:req.params.id})
        if(!foundUser){
            return res.status(404).json({message:'No user found',success:false})
        }

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'user deleted successfully',success:true})
    } catch (error) {
        
        res.status(500).json({message:error.message,success:false})
    }
})

module.exports = router
