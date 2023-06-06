const router = require('express').Router()
const Event = require('../models/eventModel')
const multer = require('multer')

const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname);
    }
});


router.post('/upload-image',authMiddleware,multer({storage}).single('image'), async(req,res)=>{
    try {
        const response = await cloudinaryConfig.uploader.upload(req.file.path,
            {
                folder:'deepthought-events'
            }
            )

            const imageUrl = response.secure_url;
            res.status(200).json({message:"image uploaded successfully",data:imageUrl,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.put('/:id/upload-image',authMiddleware,multer({storage}).single('image'),async(req,res)=>{

 

    try {
        const {id} = req.params;

        const event = await Event.findOne({_id:id})

        const url = event.imageUrl
    
        const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];

        await cloudinaryConfig.uploader.destroy(`deepthought-events/`+getPublicId(url))

        const response = await cloudinaryConfig.uploader.upload(req.file.path,
            {
                folder:'deepthought-events'
            }
            )

            const imageUrl = response.secure_url;

        await Event.findByIdAndUpdate(id,{imageUrl})
            res.status(200).json({message:"image updated successfully",data:imageUrl,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

module.exports = router