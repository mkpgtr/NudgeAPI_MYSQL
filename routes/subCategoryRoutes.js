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
   
})
module.exports  = router