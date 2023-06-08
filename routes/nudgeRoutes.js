const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware.js')
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

   
})

// create a nudge

router.post('/',authMiddleware,async(req,res)=>{


    
})


//update a nudge 

router.put('/:id',authMiddleware,async(req,res)=>{
  

})



// delete a nudge 

router.delete('/:id',authMiddleware,async(req,res)=>{


  
})



module.exports = router