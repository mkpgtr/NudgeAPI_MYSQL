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

router.get('/',async(req,res)=>{
    try {
        // fetching a single event by query string
        // this will get a single event by id 
        if(req.query.id){
            try {
                const event = await Event.findOne({_id:req.query.id})
                .populate("moderator")
                .populate("category")
                .populate("subcategory")
                .populate("attendees")

            return res.status(200).json({data:event,success:true})
        } catch (error) {
                return res.status(500).json({message:error.message,success:false})
            }
        }


        if(req.query.type && !req.query.limit && !req.query.page){
            try {
                const events = await Event.find({}).sort('-createdAt')
                .populate("moderator")
                .populate("category")
                .populate("subcategory")
                .populate("attendees")

                return res.status(200).json({data:events,success:true})
            } catch (error) {
               return res.status(500).json({message:error.messsage,success:false})
            }
        }
       
     
        // when limit is passed in the query string but not the type
        if(req.query.limit){
            
            try {
            let events;
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 2

            const skip = (page - 1) * limit

           
            events = await Event.find({})
            .populate("moderator")
            .populate("category")
            .populate("subcategory")
            .populate("attendees")
            .skip(skip)
            .limit(limit)

            // there are fewer chances of errors when the url does not have the type query parameter
            // handle the type querystring once the pagination feature works
            // this provides greater flexibility while passing querystrings in the url

            if(req.query.type==='latest'){
                events = await Event.find({})
                .populate("moderator")
                .populate("category")
                .populate("subcategory")
                .populate("attendees")
                .skip(skip)
                .limit(limit)
                .sort('-createdAt')
            }
                

            // send an additional key of count to the frontend to verify that limit actually works
                const numberOfResults = events.length
                
                return res.status(200).json({data:events,success:true,count:numberOfResults})
            
           } catch (error) {
           return res.status(500).json({message:error.message,success:false})
           }
        }
       
        const events = await Event.find({})
        .populate("moderator")
        .populate("category")
        .populate("subcategory")
        .populate("attendees")
        res.status(200).json({data:events,count:events.length,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

router.get('/all',async(req,res)=>{
    try {
        const events = await Event.find({})
        .populate("moderator")
        res.status(200).json({data:events,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})



// create event

router.post('/',authMiddleware,async(req,res)=>{
    try {
        // first find the sub category & parent cateogory of the event accordingly


        const subcategory = await SubCategory.findOne({_id:req.body.subcategory})
        if(!subcategory){
            return res.status(404).json({message:"No such category found",success:false})
        }
        const subcategoryParentId = subcategory.parentCategory._id; 
        const categoryId = await EventType.findOne({_id:req.body.category})

        // when the parent & subcategory details mismatch, then throw an error
        if(categoryId._id.valueOf()!==subcategoryParentId.valueOf()){
            return res.status(400).json({message:'inconsistent category & subcategory hierarchy',success:false})
        }
        // if all goes well, create the event
       const event = await Event.create(req.body);
        res.status(200).json({data:event._id,message:'Event created Successfully', success:true})
    } catch (error) {
        res.status(500).json({message:error.message, success:false})
        
    }
})




router.get('/',async(req,res)=>{

    
    try {
        if(!ObjectId.isValid(req.query.id)){
            return res.status(404).json({message:"please enter a valid event id",success:false})
        }
        const event = await Event.findOne({_id:req.query.id})
        .populate("event")
        .populate("moderator")

        if(!event){
            return res.status(404).json({message:"no such event found",success:false})
        }
        res.status(200).json({data : event, success:true})
    } catch (error) {
        res.status(500).json({message:error.message, success:false})
        
    }
})

// update an event

router.put('/:id',authMiddleware,async(req,res)=>{

    try {
        const event = await Event.findOne({_id:req.params.id})
        if(!event){
            return res.status(404).json({message:"no such event exists",success:false})
        }
        
        await Event.findByIdAndUpdate(req.params.id,{...req.body,imageUrl:event.imageUrl})
        res.status(200).json({message:"Event updated Successfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

// delete an event

router.delete('/:id',authMiddleware,async(req,res)=>{
    
    try {
        const {id} = req.params
        const event = await Event.findOne({_id:id})
        if(!event){
            return res.status(400).json({message:"No such event exists",success:false})
        }

        const url = event.imageUrl
    
        const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];


        // first delete the image related to that event
        const isDeleted = await cloudinaryConfig.uploader.destroy(`deepthought-events/`+getPublicId(url))

       
        // then delete the event itself by id
        await Event.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Event deleted Successfully",success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
        
    }
})

module.exports = router