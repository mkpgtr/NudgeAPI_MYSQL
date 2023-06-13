// ! this route is dedicated to testing sql queries via nodejs

const pool = require('../mysql-config/mysql-credentials.js')

const router = require('express').Router()


const NodeCache = require('node-cache')
const cache = new NodeCache()

async function getUsersData() {

    // the key acts like an indentity
    const cacheKey = `users`;
  
    // verify if data exists in cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('getting cached user data');
      return cachedData;
    }
  
    // In the first go this query will run
    const userData = await pool.query(`SELECT * FROM users`);
  
    //and then assignn this key to the userData
    cache.set(cacheKey, userData);
  
    return userData;
  }



// get all users

router.get('/',async(req,res)=>{

    try {
       
        const result  =  await getUsersData()
        res.json({data:result[0]})
     
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
