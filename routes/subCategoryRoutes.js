const router = require('express').Router()
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/authMiddleware.js');
const {Types: {ObjectId}} = mongoose;

router.post('/',async(req,res)=>{

    const {parentCategory} = req.body
    
   
})


router.get('/',async(req,res)=>{
   
})

router.get('/:id',async(req,res)=>{
    
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