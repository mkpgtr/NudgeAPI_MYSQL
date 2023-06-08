



const router = require('express').Router()

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/register',async(req,res)=>{
  
})


router.post('/login',async(req,res)=>{
  
})

router.get("/get-current-user", authMiddleware, async (req, res) => {
   
  });


module.exports = router