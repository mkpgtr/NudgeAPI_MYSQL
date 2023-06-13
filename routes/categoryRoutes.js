const pool = require('../mysql-config/mysql-credentials.js')

const router = require('express').Router()

// create an user


// ! caching

// get all users

router.get('/',async(req,res)=>{

    try {

        const result = await pool.query(`select id,name from categories`)
        const result1 = await pool.query(`select id,name,moderator,category,subcategory,rigor_rank,tagline,imageURL,createdAt,timingsFrom,timingsTo from events`)
        res.json({data:result[0]})
    } catch (error) {
        res.status(500).json({message:error})
        console.log(error)
    }
   
})

router.get('/:id',async(req,res)=>{

})

//update user
router.put('/:id',async(req,res)=>{

   
})

// delete user 

module.exports = router
