const authMiddleware = require('../middlewares/authMiddleware.js')
const pool = require('../mysql-config/mysql-credentials.js')

const router = require('express').Router()

// create an user

router.post('/',async(req,res)=>{

 try {
    const {name,role} = req.body 
    const result = await pool.query('insert into users (name,role) values (?,?)',[name,role])
    res.status(200).send({userID:result[0].insertId})  
 } catch (error) {
    res.status(500).send({message:error.message})
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
router.put('/:id',async(req,res)=>{

    try {
        
        const {name,role} = req.body
        if(!name || !role){
            return res.status(403).json({message:'empty values are not allowed'})
        }
        const {id} = req.params


        const userAlreadyPresent = await pool.query(`select * from users where id=?`,[id])
        const updateUser = await pool.query(`update users set name=?,role=? where id=${id}`,[name ? name : userAlreadyPresent[0].name, role ? role : userAlreadyPresent[0].role])
        console.log(userAlreadyPresent[0])

        res.status(200).json({message:"user updated successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
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
