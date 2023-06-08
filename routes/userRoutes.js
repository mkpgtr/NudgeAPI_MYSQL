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

   
})

router.get('/:id',async(req,res)=>{

})

//update user
router.put('/:id',async(req,res)=>{

   
})

// delete user 

router.delete('/:id',async(req,res)=>{
    
  
})

module.exports = router
