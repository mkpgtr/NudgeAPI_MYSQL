const router = require('express').Router()

const multer = require('multer')

const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const pool = require('../mysql-config/mysql-credentials.js');

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname);
    }
});


router.post('/upload-image',multer({storage}).single('image'), async(req,res)=>{
    try {
        const response = await cloudinaryConfig.uploader.upload(req.file.path,
            {
                folder:'nudge'
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

        const alreadyExistingImage = await pool.query('select * from nudges where id=?',[id])
        const url = alreadyExistingImage[0][0].coverImage

        if(!url.startsWith('https')){
            return res.status(404).json({message:"image not found. please try uploading image via post route"})
        }
    
        const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];

        await cloudinaryConfig.uploader.destroy(`nudge/`+getPublicId(url))

        const response = await cloudinaryConfig.uploader.upload(req.file.path,
            {
                folder:'nudge'
            }
            )

            const imageUrl = response.secure_url;

            const result = await pool.query('update nudges set coverImage=? where id=?',[imageUrl,id])
            res.status(200).json({message:"image updated successfully",data:imageUrl,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

module.exports = router