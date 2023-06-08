const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware.js')


router.post('/',async(req,res)=>{


    try {
        await EventType.create(req.body)
        res.status(200).json({message:"Event Category Created Successfully",success:true})
    }
        
     catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
})

router.get('/',async(req,res)=>{
    try {
        const eventTypes = await EventType.find({})
        res.status(200).json({data:eventTypes,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const event = await EventType.find({_id:req.params.id})
        res.status(200).json({data:event,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const eventType = await EventType.findOne({_id:id})

        if(!eventType){
            return res.status(400).json({message:"there is no such event",success:false})
        }

        await EventType.findByIdAndUpdate(req.params.id,req.body)

        res.status(200).json({message:"eventType updated successfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})





module.exports = router