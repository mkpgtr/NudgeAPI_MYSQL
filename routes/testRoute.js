// ! this route is dedicated to testing sql queries via nodejs

const pool = require('../mysql-config/mysql-credentials.js')

const router = require('express').Router()

// create an user





// get all users

router.get('/',async(req,res)=>{

    try {
        const result0 = await pool.query('select * from events')
        const result = await pool.query('select id,category,subcategory,moderator,rigor_rank,timingsFrom,timingsTo,tagline,createdAt,imageURL from events')
         // ! select count(*)
       const result1 = await pool.query('select count(*) from events')
       const result2 = await pool.query('select count(*) from persons where personID=1')
        res.json({data:result2[0][0]['count(*)'] > 0})
     
    } catch (error) {
     res.status(500).json({message:error.message})
    }
   
})

router.get('/:id',async(req,res)=>{

})

//update user
router.put('/:id',async(req,res)=>{

   
})

// delete user 

module.exports = router
