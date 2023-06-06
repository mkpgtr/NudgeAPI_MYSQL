const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware.js')
const Nudge = require('../models/nudgeModel.js')
const cloudinaryConfig = require('../config/cloudinaryConfig.js');



//get all nudges

router.get('/',async(req,res)=>{
 
    try {
        const nudges = await Nudge.find({})
        res.status(200).json({data:nudges,success:true})

    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

//get single nudge

router.get('/:id',async(req,res)=>{

    try {
        const {id} = req.params
        console.log(id)
        const nudge = await Nudge.findOne({_id:id})
        if(!nudge){
            return res.status(404).json({message:"no such nudge exists",success:false})
        }

        res.status(200).json({data:nudge,success:true})

    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

// create a nudge

router.post('/',authMiddleware,async(req,res)=>{


    try {
        await Nudge.create(req.body)
        res.status(500).json({message:"Nudge Created Successfully",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})


//update a nudge 

router.put('/:id',authMiddleware,async(req,res)=>{
    try {
        const nudge = await Nudge.findOne({_id:req.params.id})
        if(!nudge){
            return res.json({message:"no such nudge exists",success:false})
        }
        await Nudge.findByIdAndUpdate(req.params.id,{...req.body,coverImage:nudge.coverImage})
        res.status(200).json({message:"Nudge Updated Successfully",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

})



// delete a nudge 

router.delete('/:id',authMiddleware,async(req,res)=>{


    try {
        const {id} = req.params
        const nudge = await Nudge.findOne({_id:id})
        if(!nudge){
            return res.status(400).json({message:"No such nudge exists",success:false})
        }

        const url = nudge.coverImage

        const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];

        console.log(url)

        // first delete the image related to that nudge
        await cloudinaryConfig.uploader.destroy(`nudge/`+getPublicId(url))

        
        await Nudge.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Nudge Deleted Successfully",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})



module.exports = router