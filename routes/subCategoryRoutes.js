const pool = require('../mysql-config/mysql-credentials.js')

const router = require('express').Router()

// create an user



// get all users

router.get('/',async(req,res)=>{

    try {
        const result = await pool.query(`select * from subcategory`)
        
        res.json({data:result[0]})
    } catch (error) {
        res.status(500).json({message:error})
        console.log(error)
    }
   
})

router.get('/:name',async(req,res)=>{

    try {
        const result = await pool.query(`select * from categories where name=?`,[req.params.name])
      
        const result2 = await pool.query(`select * from subcategory where parentCategory=?`,[result[0][0].id])
        res.json({data:result[0],data2:result2[0]})
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
