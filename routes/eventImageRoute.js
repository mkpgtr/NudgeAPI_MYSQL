const router = require('express').Router()
const multer = require('multer')

const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../mysql-config/mysql-credentials');

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname);
    }
});


router.post('/upload-image',multer({storage}).single('image'), async(req,res)=>{
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

router.put('/:id/upload-image',multer({storage}).single('image'),async(req,res)=>{

 

    try {
        const {id} = req.params;
        if(!req.file){
            return res.status(400).json({message:"no image being sent. please send an image"})
        }

        const previousImage = await pool.query(`select imageURL from events where id = ?`,[id])

        if(!previousImage[0].length > 0){
            return res.status(404).json({message:"no such event found"})
        }

        // this will pick the first object in the array previousImage[0]
        const url = previousImage[0][0].imageURL.startsWith('https:')

        if(!url){
            return res.status(400).json({message:"no image is present in the database already"})
        }
    
        const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];

        await cloudinaryConfig.uploader.destroy(`deepthought-events/`+getPublicId(url))

        const response = await cloudinaryConfig.uploader.upload(req.file.path,{
                folder:'deepthought-events'
            })

            const imageUrl = response.secure_url;

        const result = await pool.query(`update events set imageURL=? where id=?`,[imageUrl,id])

            res.status(200).json({message:"image updated successfully",data:imageUrl,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

module.exports = router