const express = require('express').Router()

const router = require('express').Router()

const mongoose = require('mongoose')
const {Types: {ObjectId}} = mongoose;
const Event = require('../models/eventModel')
const SubCategory = require('../models/subCategory')
const EventType = require('../models/eventTypeModel')
const Nudge = require('../models/nudgeModel')
const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../mysql-config/mysql-credentials');


// i have done things the brute force way because I have not taken any course on Udemy that uses NodeJs +MYSQL

// I did things in a not-so-messy way in nodeJs + mongoDB because I have taken courses that teach how to do things in a standard way in MERN stack

router.get('/',async(req,res)=>{

    try {
        let {id,limit,page,type} = req.query
    console.log(req.query)
    console.log(req.query)
    
    // const result = await pool.query("select * from events")
    if(id && !limit && !page && !type){
        const result = await pool.query('select * from events where id = ?',[id])

        for(var i =0;i<result[0].length;i++){
            // https://stackoverflow.com/questions/48652138/mysql-storing-ids-as-an-array-in-a-table
    
            // used this above link to understand how to do this in mysql
            let attendeesResult =  await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
            const SubCategoryJoin = await pool.query(`select * from subcategory`)
            const categoryJoin = await pool.query(`select * from subcategory`)
            const moderatorQuery = await pool.query(`select * from users where role='moderator'`)
    
            result[0][i].attendees = attendeesResult[0]
            result[0][i].subcategory = SubCategoryJoin[0].map((singleCategory)=>{
                console.log(singleCategory.id,result[0][i].subcategory)
                if(singleCategory.id===result[0][i].subcategory){
                    return singleCategory.name
                }
                else{
                    return
                }
                // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                // i wanted to remove null values because I did not want empty indexes with nothing in them
            }).filter(function(val) { return val !== null; }).join("")
    
            result[0][i].moderator = moderatorQuery[0].map((singleModerator)=>{
                console.log(singleModerator.id,result[0][i].subcategory)
                if(singleModerator.id===result[0][i].moderator){
                    return singleModerator.name
                }
                else{
                    return
                }
                // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                // i wanted to remove null values because I did not want empty indexes with nothing in them
            }).filter(function(val) { return val !== null; }).join("")
            
    
         }
    
        if(result[0].length > 0){
            return res.send(result[0])
        }else
        {
            return res.send('no data found')
        }
    }
    if(type==='latest' && limit){

        if(!page){
            page = 1
        }

        skip = (page - 1) * limit

        console.log(skip, 'skip')
         
        let result= await pool.query(`select * from events order by createdAt desc limit ${skip},${limit} `)

        console.log(result[0].length)
        for(var i =0;i<result[0].length;i++){
            // https://stackoverflow.com/questions/48652138/mysql-storing-ids-as-an-array-in-a-table
    
            // used this above link to understand how to do this in mysql
            let attendeesResult =  await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
            const SubCategoryJoin = await pool.query(`select * from subcategory`)
            const categoryJoin = await pool.query(`select * from subcategory`)
            const moderatorQuery = await pool.query(`select * from users where role='moderator'`)
    
            result[0][i].attendees = attendeesResult[0]
            result[0][i].subcategory = SubCategoryJoin[0].map((singleCategory)=>{
                console.log(singleCategory.id,result[0][i].subcategory)
                if(singleCategory.id===result[0][i].subcategory){
                    return singleCategory.name
                }
                else{
                    return
                }
                // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                // i wanted to remove null values because I did not want empty indexes with nothing in them
            }).filter(function(val) { return val !== null; }).join("")
    
            result[0][i].moderator = moderatorQuery[0].map((singleModerator)=>{
                console.log(singleModerator.id,result[0][i].subcategory)
                if(singleModerator.id===result[0][i].moderator){
                    return singleModerator.name
                }
                else{
                    return
                }
                // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                // i wanted to remove null values because I did not want empty indexes with nothing in them
            }).filter(function(val) { return val !== null; }).join("")
            
    
         }
      return  res.json(result[0])
    }

    let result = await pool.query('select * from events')
    // when there are no query params
    
    for(var i =0;i<result[0].length;i++){
        // https://stackoverflow.com/questions/48652138/mysql-storing-ids-as-an-array-in-a-table

        // used this above link to understand how to do this in mysql
        let attendeesResult =  await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
        const SubCategoryJoin = await pool.query(`select * from subcategory`)
        const categoryJoin = await pool.query(`select * from subcategory`)
        const moderatorQuery = await pool.query(`select * from users where role='moderator'`)

        result[0][i].attendees = attendeesResult[0]
        result[0][i].subcategory = SubCategoryJoin[0].map((singleCategory)=>{
            console.log(singleCategory.id,result[0][i].subcategory)
            if(singleCategory.id===result[0][i].subcategory){
                return singleCategory.name
            }
            else{
                return
            }
            // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
            // i wanted to remove null values because I did not want empty indexes with nothing in them
        }).filter(function(val) { return val !== null; }).join("")

        result[0][i].moderator = moderatorQuery[0].map((singleModerator)=>{
            console.log(singleModerator.id,result[0][i].subcategory)
            if(singleModerator.id===result[0][i].moderator){
                return singleModerator.name
            }
            else{
                return
            }
            // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
            // i wanted to remove null values because I did not want empty indexes with nothing in them
        }).filter(function(val) { return val !== null; }).join("")
        

     }

     res.send(result[0])
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/',async(req,res)=>{

   try {
    console.log(req.body)
    const {category,attendees,subcategory,moderator,name,rigor_rank,timingsFrom,timingsTo,imageURL,tagline}=req.body;


    const result = await pool.query('insert into events (category,subcategory,moderator,name,rigor_rank,timingsFrom,timingsTo,imageURL,tagline) values (?,?,?,?,?,?,?,?,?)',[category,subcategory,moderator,name,rigor_rank,timingsFrom,timingsTo,imageURL,tagline])

    // console.log(result[0])

   const lastAddedId = result[0].insertId
//  once we add an event, we get its id and then we iterate over each element in the attendees array
// and on each iteration we add to the attendees table event_id & attendee
// let's say we have 3 attendees, then the loop will run three times and insert each attendee into the attendees table.

// i am very happy that I was able to think through this without ChatGPT but the idea came from stackoverflow when I was searching for how to insert an array into into mysql.

// it said that we don't insert array. instead we create a separate table an store event_id & attendee id.
// which represents which attendee is going to which event

// for the sake of easier testing of this code, I am not checking whether moderators can attend the event or only attendee can attend the event. I am allowing everyone to attend the event.

// so if you see moderator's id in attendee list, just know that it was done for easier testing purposes
    for(let i=0;i<attendees.length;i++){
        await pool.query(`insert into attendees (event_id,attendee_id) values(?,?)`,[lastAddedId,attendees[i]])
    }


    res.send({id:result[0].insertId})
   } catch (error) {
    res.json({message:error.message})
   }
})







// router.get('/all',async(req,res)=>{
//     try {
//         const events = await Event.find({})
//         .populate("moderator")
//         res.status(200).json({data:events,success:true})
//     } catch (error) {
//         res.status(500).json({message:error.message,success:false})
//     }
// })



// create event

// router.post('/',authMiddleware,async(req,res)=>{
//     try {
//         // first find the sub category & parent cateogory of the event accordingly


//         const subcategory = await SubCategory.findOne({_id:req.body.subcategory})
//         if(!subcategory){
//             return res.status(404).json({message:"No such category found",success:false})
//         }
//         const subcategoryParentId = subcategory.parentCategory._id; 
//         const categoryId = await EventType.findOne({_id:req.body.category})

//         // when the parent & subcategory details mismatch, then throw an error
//         if(categoryId._id.valueOf()!==subcategoryParentId.valueOf()){
//             return res.status(400).json({message:'inconsistent category & subcategory hierarchy',success:false})
//         }
//         // if all goes well, create the event
//        const event = await Event.create(req.body);
//         res.status(200).json({data:event._id,message:'Event created Successfully', success:true})
//     } catch (error) {
//         res.status(500).json({message:error.message, success:false})
        
//     }
// })




// router.get('/',async(req,res)=>{

    
//     try {
//         if(!ObjectId.isValid(req.query.id)){
//             return res.status(404).json({message:"please enter a valid event id",success:false})
//         }
//         const event = await Event.findOne({_id:req.query.id})
//         .populate("event")
//         .populate("moderator")

//         if(!event){
//             return res.status(404).json({message:"no such event found",success:false})
//         }
//         res.status(200).json({data : event, success:true})
//     } catch (error) {
//         res.status(500).json({message:error.message, success:false})
        
//     }
// })

// // update an event

// router.put('/:id',authMiddleware,async(req,res)=>{

//     try {
//         const event = await Event.findOne({_id:req.params.id})
//         if(!event){
//             return res.status(404).json({message:"no such event exists",success:false})
//         }
        
//         await Event.findByIdAndUpdate(req.params.id,{...req.body,imageUrl:event.imageUrl})
//         res.status(200).json({message:"Event updated Successfully",success:true})
//     } catch (error) {
//         res.status(500).json({message:error.message,success:false})
//     }
// })

// // delete an event

// router.delete('/:id',authMiddleware,async(req,res)=>{
    
//     try {
//         const {id} = req.params
//         const event = await Event.findOne({_id:id})
//         if(!event){
//             return res.status(400).json({message:"No such event exists",success:false})
//         }

//         const url = event.imageUrl
    
//         const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];


//         // first delete the image related to that event
//         const isDeleted = await cloudinaryConfig.uploader.destroy(`deepthought-events/`+getPublicId(url))

       
//         // then delete the event itself by id
//         await Event.findByIdAndDelete(req.params.id)
//         res.status(200).json({message:"Event deleted Successfully",success:true})
//     } catch (error) {
//         res.status(500).json({message:error.message,success:false})
        
//     }
// })

module.exports = router