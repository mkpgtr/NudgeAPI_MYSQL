const express = require('express').Router()

const router = require('express').Router()

const cloudinaryConfig = require('../config/cloudinaryConfig.js');
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

        if(!result[0].length > 0){
            return res.status(404).json({message:"No events found"})
        }

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

    if(!result[0].length > 0){
        return res.status(404).json({message:"No events found"})
    }
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


router.put('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {category,attendees,subcategory,moderator,name,rigor_rank,timingsFrom,timingsTo,imageURL,tagline}=req.body;
    
        // find if the event already exists or not

        const resultExists = await pool.query(`select * from events where id = ?`,[id])
        if(!resultExists[0].length > 0){
            return res.status(404).json({message:"No such event exists"})
        }
    
        const result = await pool.query(`update events set category=?, subcategory=?,moderator=?,name=?,rigor_rank=?,timingsFrom=?,timingsTo=?,imageURL=?,tagline=? where id=${id}`,[category ? category : resultExists[0][0].category,subcategory ? subcategory : resultExists[0][0].subcategory,moderator ? moderator : resultExists[0][0].moderator,name ? name :resultExists[0][0].name,rigor_rank ? rigor_rank : resultExists[0][0].rigor_rank,timingsFrom ? timingsFrom : resultExists[0][0].timingsFrom,timingsTo ? timingsTo : resultExists[0][0].timingsTo,imageURL ? imageURL : resultExists[0][0].imageURL,tagline ? tagline : resultExists[0][0].tagline])
    
        console.log(attendees)
    

    //  once we add an event, we get its id and then we iterate over each element in the attendees array
    // and on each iteration we add to the attendees table event_id & attendee
    // let's say we have 3 attendees, then the loop will run three times and insert each attendee into the attendees table.
    
    // i am very happy that I was able to think through this without ChatGPT but the idea came from stackoverflow when I was searching for how to insert an array into into mysql.
    
    // it said that we don't insert array. instead we create a separate table an store event_id & attendee id.
    // which represents which attendee is going to which event
    
    // for the sake of easier testing of this code, I am not checking whether moderators can attend the event or only attendee can attend the event. I am allowing everyone to attend the event.


    if(attendees.length > 0){
        // when the user wants to update attendees, the attendees array length will be greater than 0

        // first delete all attendees  that belong to this ID
        await pool.query(`delete from attendees where event_id=?`,[id])
        for(let i=0;i<attendees.length;i++){
            
            await pool.query(`insert into attendees (event_id,attendee_id) values(?,?)`,[id,attendees[i]])
        }
    }else{
        // if the user passes an empty array, then delete all the attendees from that event
        await pool.query(`delete from attendees where event_id=?`,[id])
    }
    // so if you see moderator's id in attendee list, just know that it was done for easier testing purposes
       
    
    
        res.send({id:result[0].insertId, message:"event updated successfully"})
       } catch (error) {
        res.json({message:error.message})
       }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const eventExists = await pool.query(`select * from events where id=?`,[id])
        if(!eventExists[0].length > 0){
            return res.status(404).json({message:"no such event exists"})
        }
        const result = await pool.query(`delete from events where id=?`,[id])
        res.status(200).json({message:"Event Deleted Succcessfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})




module.exports = router