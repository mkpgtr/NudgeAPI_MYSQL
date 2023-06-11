const express = require('express').Router()

const router = require('express').Router()

const cloudinaryConfig = require('../config/cloudinaryConfig.js');
const pool = require('../mysql-config/mysql-credentials');


// i have done things the brute force way because I have not taken any course on Udemy that uses NodeJs +MYSQL

// I did things in a not-so-messy way in nodeJs + mongoDB because I have taken courses that teach how to do things in a standard way in MERN stack

router.get('/', async (req, res) => {

    
    try {
        let { id, limit, page, type } = req.query
       

        // const result = await pool.query("select * from events")
        if (id && !limit && !page && !type) {
            const result = await pool.query('select * from events where id = ?', [id])

            if (!result[0].length > 0) {
                return res.status(404).json({ message: "No events found" })
            }

            // https://stackoverflow.com/questions/48652138/mysql-storing-ids-as-an-array-in-a-table
            
            // used this above link to understand how to store arrays coming from frontend in mysql to database

            // but this loop was written by me
            for (var i = 0; i < result[0].length; i++) {

                let attendeesResult = await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
                const SubCategoryJoin = await pool.query(`select * from subcategory`)
               
                const categoryQuery = await pool.query('select * from categories')
                const moderatorQuery = await pool.query(`select * from users where role='moderator' or role='attendee'`)
                // but this looping and adding keys to objects was entirely done by me.
                // I used this map function a lot while building social media twitter-like app to extract objectIds into an array


                // if the category id in the categories table matches the category id in the events table
                // it means that this category is the category of that particular row in the events table
                
                result[0][i].category = categoryQuery[0].map((category)=>{
                    if(category.id === result[0][i].category){
                        // sending number back to frontend
                        return category.name
                    }
                }).filter(function (val) { return val !== null; }).join("")
                
                result[0][i].attendees = attendeesResult[0]
                result[0][i].subcategory = SubCategoryJoin[0].map((singleCategory) => {
                    if (singleCategory.id === result[0][i].subcategory) {
                        // sending number back to frontend
                        return singleCategory.name
                    }
                    else {
                        return
                    }
                    // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                    // i wanted to remove null values because I did not want empty indexes with nothing in them
                }).filter(function (val) { return val !== null; }).join("")

                result[0][i].moderator = moderatorQuery[0].map((singleModerator) => {
                    if (singleModerator.id === result[0][i].moderator) {
                        console.log(singleModerator)
                        // moderator name being sent to frontend inside result[0][i]
                        return singleModerator.name
                    }
                    else {
                        return
                    }
                    // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                    // i wanted to remove null values because I did not want empty indexes with nothing in them
                }).filter(function (val) { return val !== null; }).join("")


            }

            if (result[0].length > 0) {
                return res.send(result[0])
            } else {
                return res.send('no data found')
            }
        }
        if (type === 'latest' && limit) {

            if (!page) {
                page = 1
            }

            skip = (page - 1) * limit


            let result = await pool.query(`select * from events order by createdAt desc limit ${skip},${limit} `)

            for (var i = 0; i < result[0].length; i++) {
                // https://stackoverflow.com/questions/48652138/mysql-storing-ids-as-an-array-in-a-table

                // used this above link to understand how to do this in mysql
                let attendeesResult = await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
                const SubCategoryJoin = await pool.query(`select * from subcategory`)
                const categoryJoin = await pool.query(`select * from subcategory`)
                const moderatorQuery = await pool.query(`select * from users where role='moderator'`)

                result[0][i].attendees = attendeesResult[0]
                result[0][i].subcategory = SubCategoryJoin[0].map((singleCategory) => {
                    if (singleCategory.id === result[0][i].subcategory) {
                        return singleCategory.name
                    }
                    else {
                        return
                    }
                    // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                    // i wanted to remove null values because I did not want empty indexes with nothing in them
                }).filter(function (val) { return val !== null; }).join("")

                result[0][i].moderator = moderatorQuery[0].map((singleModerator) => {
                    if (singleModerator.id === result[0][i].moderator) {
                        return singleModerator.name
                    }
                    else {
                        return
                    }
                    // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                    // i wanted to remove null values because I did not want empty indexes with nothing in them
                }).filter(function (val) { return val !== null; }).join("")


            }
            return res.json(result[0])
        }

        let result = await pool.query('select * from events')

        if (!result[0].length > 0) {
            return res.status(404).json({ message: "No events found" })
        }
        // when there are no query params

        for (var i = 0; i < result[0].length; i++) {
            // https://stackoverflow.com/questions/48652138/mysql-storing-ids-as-an-array-in-a-table

            // used this above link to understand how to do this in mysql
            let attendeesResult = await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
            const SubCategoryJoin = await pool.query(`select * from subcategory`)
            const categoryJoin = await pool.query(`select * from categories`)
            const moderatorQuery = await pool.query(`select * from users where role='moderator'`)

            result[0][i].attendees = attendeesResult[0]
            result[0][i].subcategory = SubCategoryJoin[0].map((singleCategory) => {
                if (singleCategory.id === result[0][i].subcategory) {
                    return singleCategory.name +`${singleCategory.id}`
                }
                else {
                    return
                }
                // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                // i wanted to remove null values because I did not want empty indexes with nothing in them
            }).filter(function (val) { return val !== null; }).join("")

            result[0][i].category = categoryJoin[0].map((category)=>{
                if(category.id === result[0][i].category){
                    return category.name
                }
            }).filter(function (val) { return val !== null; }).join("")
            result[0][i].moderator = moderatorQuery[0].map((singleModerator) => {
                if (singleModerator.id === result[0][i].moderator) {
                    return singleModerator.name
                }
                else {
                    return
                }
                // https://stackoverflow.com/questions/2132030/remove-null-values-from-javascript-array
                // i wanted to remove null values because I did not want empty indexes with nothing in them
            }).filter(function (val) { return val !== null; }).join("")


        }

        res.send(result[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {

    try {
        let { category, attendees, subcategory, moderator, name, rigor_rank, timingsFrom, timingsTo, imageURL, tagline } = req.body;

        if(!category || !attendees || ! subcategory || !moderator || !name || !rigor_rank || !timingsFrom || !timingsTo || !imageURL || !tagline ){
            return res.status(400).json({message:"Please provide all the values to create an event"})
        }

        console.log(moderator,subcategory,category)
        // data from frontend comes as string, so convert it into integer
        // moderator = parseInt(moderator)
        // subcategory = parseInt(subcategory)
        rigor_rank = parseInt(rigor_rank)
        // category = parseInt(category)
        

        // check if attendee is a user (meaning that if user exists in database or not)

       for(let i=0;i<attendees.length;i++){
        let userFound = await pool.query('select id from users where id=?',[attendees[i]])
        if(!userFound[0].length > 0){
            return res.status(404).json({message:"invalid attendee ID entered in attendee array"})
        }
       }

        const moderatorExists = await pool.query('select * from users where name=?',[moderator])
        const subcategoryExists = await pool.query('select * from subcategory where name=?',[subcategory])
        const categoryExists = await pool.query('select * from categories where name=?',[category])

        if(!moderatorExists[0].length > 0){
            return res.status(404).json({message:`no such moderator by ${moderator} exists in database`})
        }
        if(!subcategoryExists[0].length > 0){
            return res.status(404).json({message:`no such subcategory by ${subcategory} exists in database`})
        }
        if(!categoryExists[0].length > 0){
            return res.status(404).json({message:`no such category by ${category} exists in database`})
        }
        // 
        if(!attendees){
            return res.status(400).json({message:"please provide attendees array"})
        }
        const result = await pool.query('insert into events (category,subcategory,moderator,name,rigor_rank,timingsFrom,timingsTo,imageURL,tagline) values (?,?,?,?,?,?,?,?,?)', [categoryExists[0][0].id, subcategoryExists[0][0].id, moderatorExists[0][0].id, name, rigor_rank, timingsFrom, timingsTo, imageURL, tagline])


        const lastAddedId = result[0].insertId

        //  once we add an event, we get its id and then we iterate over each element in the attendees array
        // and on each iteration we add to the attendees table event_id & attendee
        // let's say we have 3 attendees, then the loop will run three times and insert each attendee into the attendees table.

        // i am very happy that I was able to think through this without ChatGPT but the idea came from stackoverflow when I was searching for how to insert an array into into mysql.

        // it said that we don't insert array. instead we create a separate table an store event_id & attendee id.
        // which represents which attendee is going to which event

        // for the sake of easier testing of this code, I am not checking whether moderators can attend the event or only attendee can attend the event. I am allowing everyone to attend the event.

        // so if you see moderator's id in attendee list, just know that it was done for easier testing purposes
        for (let i = 0; i < attendees.length; i++) {
            await pool.query(`insert into attendees (event_id,attendee_id) values(?,?)`, [lastAddedId, attendees[i]])
        }


        res.send({ id: result[0].insertId })
    } catch (error) {
        res.json({ message: error.message })
    }
})
// update route

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // find if the event already exists or not
        let { category, attendees,
             subcategory, moderator, name, rigor_rank, 
             timingsFrom, timingsTo, imageURL, tagline } = req.body;
             // data from frontend comes as string, so convert it into integer
            //  subcategory = parseInt(subcategory)
             rigor_rank = parseInt(rigor_rank)
            //  category = parseInt(category)
            //  moderator = parseInt(moderator)

        if(!category ||  ! subcategory || !attendees || !moderator || !name || !rigor_rank || !timingsFrom || !timingsTo || !imageURL || !tagline ){
            return res.status(400).json({message:"Please provide all the values to create an event"})
        }
        // attendees is coming as string from the frontend form
        // so I first split it (convert it into an array)
        // and then I use my favorite map method to do the same thing I have been doing all through out this project
        // to extract particular values 
        attendees = attendees.split(',').map((attendee)=>{
            return parseInt(attendee)
        })
      
        const moderatorExists = await pool.query('select * from users where name=?',[moderator])
        const subcategoryExists = await pool.query('select * from subcategory where name=?',[subcategory])
        const categoryExists = await pool.query('select * from categories where name=?',[category])

        console.log('moderator exists', moderatorExists[0][0])
        if(!moderatorExists[0].length > 0){
            return res.status(404).json({message:`no such moderator by ${moderator} exists in database`})
        }
        if(!subcategoryExists[0].length > 0){
            return res.status(400).json({message:`no such subcategory by ${subcategory} exists in database`})
        }
        if(!categoryExists[0].length > 0){
            return res.status(400).json({message:`no such category by ${category} exists in database`})
        }
        // 
      

        const resultExists = await pool.query(`select * from events where id = ?`, [id])


        if (!resultExists[0] || !resultExists[0].length > 0) {
            return res.status(404).json({ message: "No such event exists" })
        }



        const result = await pool.query(`update events set category=?, subcategory=?,moderator=?,name=?,rigor_rank=?,timingsFrom=?,timingsTo=?,imageURL=?,tagline=? where id=${id}`, [category ? categoryExists[0][0].id : resultExists[0][0].category, subcategory ? subcategoryExists[0][0].id : resultExists[0][0].subcategory, moderator ? moderatorExists[0][0].id : resultExists[0][0].moderator, name ? name : resultExists[0][0].name, rigor_rank ? rigor_rank : resultExists[0][0].rigor_rank, timingsFrom ? timingsFrom : resultExists[0][0].timingsFrom, timingsTo ? timingsTo : resultExists[0][0].timingsTo, imageURL ? imageURL : resultExists[0][0].imageURL, tagline ? tagline : resultExists[0][0].tagline])


        // it means that the user does not want to update the attendees
        if (!attendees) {
            return res.status(201).json({ message: "event updated successfully & attendees was not passed so attendees were not updated" })
        }


        //  once we add an event, we get its id and then we iterate over each element in the attendees array
        // and on each iteration we add to the attendees table event_id & attendee
        // let's say we have 3 attendees, then the loop will run three times and insert each attendee into the attendees table.

        // i am very happy that I was able to think through this without ChatGPT but the idea came from stackoverflow when I was searching for how to insert an array into into mysql.

        // it said that we don't insert array. instead we create a separate table an store event_id & attendee id.
        // which represents which attendee is going to which event

        // for the sake of easier testing of this code, I am not checking whether moderators can attend the event or only attendee can attend the event. I am allowing everyone to attend the event.


        if (attendees.length > 0) {
            // when the user wants to update attendees, the attendees array length will be greater than 0

            // first delete all attendees  that belong to this ID
            await pool.query(`delete from attendees where event_id=?`, [id])
            for (let i = 0; i < attendees.length; i++) {

                await pool.query(`insert into attendees (event_id,attendee_id) values(?,?)`, [id, attendees[i]])
            }
        }
        // if the user passes an empty array, then delete all the attendees from that event
        else if (attendees.length === 0) {
            await pool.query(`delete from attendees where event_id=?`, [id])
        }
        // so if you see moderator's id in attendee list, just know that it was done for easier testing purposes



        res.send({ id: result[0].insertId, message: "event updated successfully" })
    } catch (error) {
        res.json({ message: error.message })
    }
})

// delete route
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const eventExists = await pool.query(`select * from events where id=?`, [id])
        if (!eventExists[0].length > 0) {
            return res.status(404).json({ message: "no such event exists" })
        }
        const result = await pool.query(`delete from events where id=?`, [id])
        res.status(200).json({ message: "Event Deleted Succcessfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




module.exports = router