const router = require('express').Router()
const SubCategory = require('../models/subCategory.js')
const mongoose = require('mongoose')
const EventType = require('../models/eventTypeModel.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const {Types: {ObjectId}} = mongoose;

router.post('/',authMiddleware,async(req,res)=>{

    const {parentCategory} = req.body
    
    try {
        if(!ObjectId.isValid(parentCategory)){
            return res.status(404).json({message:"please enter a valid event id",success:false})
        }
        
        const parent = await EventType.findOne({_id:parentCategory})
        if(!parent){

            return res.status(404).json({message:"no such parent category exists",success:false})

        }
        await SubCategory.create(req.body)

        res.status(201).json({message:"Sub Category created successfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})


router.get('/',async(req,res)=>{
    try {
        const subcategories = await SubCategory.find({})
        .populate("parentCategory","name")
        res.status(200).json({data:subcategories,success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const subCategory = await SubCategory.findOne({_id:req.params.id})
        .populate("parentCategory")
        
        if(!subCategory){
            return res.status(404).json({message:"no such sub category exists"})
        }


        res.status(200).json({data:subCategory,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.put('/:id',authMiddleware,async(req,res)=>{
    try {
        const subcategories = await SubCategory.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({message:"Sub Category updated successfully",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})
module.exports  = router