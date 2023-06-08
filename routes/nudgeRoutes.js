const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware.js')
const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const pool = require('../mysql-config/mysql-credentials.js');



//get all nudges

router.get('/',async(req,res)=>{
 try {
    const result = await pool.query('select * from nudges')
    if(!result[0].length > 0){
        return res.status(404).json({message:"No nudges found"})
    }
    return res.status(200).json({data:result[0]})
 } catch (error) {
    res.status(404).json({message:error.message})
 }
})

//get single nudge

router.get('/:id',async(req,res)=>{

   
})

// create a nudge

router.post('/',async(req,res)=>{

try {
    const {icon,event,timingsFrom,timingsTo,description} = req.body;
    const eventAlreadyAnnounced = await pool.query('select * from nudges where event = ?',[event])
    if(eventAlreadyAnnounced[0].length > 0){
        return res.status(409).json({message:"event has already been nudged about. cannot be done again."})
    }
    if(!icon || !event || !timingsFrom || !timingsTo || !description){
        return res.status(400).json({message:"Please enter all the values"})
    }
    const result = await pool.query(`insert into nudges (icon,event,timingsFrom,timingsTo,description) values(?,?,?,?,?)`,[icon,event,timingsFrom,timingsTo,description])
    
    return res.status(200).json({data:result[0].insertId})
} catch (error) {
    res.status(500).json({message:error.message})
}
    
})


//update a nudge 

router.put('/:id',async(req,res)=>{
   
    
try {
    const {id} = req.params;
    const {icon,event,timingsFrom,timingsTo,description,coverImage} = req.body;
    const nudgeExists = await pool.query('select * from nudges where id = ?',[id])
    if(!nudgeExists[0].length > 0){
        return res.status(404).json({message:"nudge not found. please create one nudge so that you can update"})
    }

    const updateNudge = await pool.query(`update nudges set icon=?,event=?, timingsFrom=?, timingsTo=?, coverImage=?,description=? where id = ${id}`,
    [icon ? icon :nudgeExists[0].icon,event ? event : nudgeExists[0].event,timingsFrom ? timingsFrom : nudgeExists[0].timingsFrom, timingsTo ? timingsTo : nudgeExists[0].timingsTo, coverImage ? coverImage : nudgeExists[0].coverImage,description ? description : nudgeExists[0].description])
    res.status(200).json({message:'nudge updated successfully'})
} catch (error) {
    res.status(500).json({message:error.message})
}
})



// delete a nudge 

router.delete('/:id',async(req,res)=>{

    try {
        const {id} = req.params
        const alreadyExists = await pool.query(`select * from nudges where id=?`,[id])
        const result = await pool.query('delete from nudges where id=?',[id])
    if(!alreadyExists[0].length > 0){
        return res.status(404).json({message:"No nudges found"})
    }
    res.status(200).json({message:'nudge deleted successfullly'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

  
})



module.exports = router