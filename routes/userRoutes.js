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

router.get('/',async(req,res)=>{

   
})

router.get('/:id',async(req,res)=>{

})

//update user
router.put('/:id',async(req,res)=>{

   
})

// delete user 

router.delete('/:id',async(req,res)=>{
    
    try {
        const {id} = req.params
        const userExists = await pool.query(`select * from users where id = ?`,[id])
        if(!userExists){
            return res.status(404).json({message:'user not found.'})
        }
        const result = await pool.query(`delete from users where id =${id}`)
        res.status(200).json({message:'user deleted successfully'})
    } catch (error) {
        res.json({message:error.message})
    }
  
})

module.exports = router
