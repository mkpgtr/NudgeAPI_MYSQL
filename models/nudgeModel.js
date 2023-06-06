const mongoose = require('mongoose')
const moment = require('moment')

const nudgeSchema = new mongoose.Schema({
    eventCategoryId :{
        type:mongoose.Types.ObjectId,
        ref:'eventType',
        required:true
    },
    eventId:{
        type:mongoose.Types.ObjectId,
        ref:'event',
        required:true

    },
    // this will have the css class of the icon (from fontawesome or remix icons)
    icon:{
        type:String,
        required:true
    },
    invitationLine:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
        
    },
    scheduled:{
        type:[
         {
             on :{
                 type:Date,
                 required:true
             },
             from :{
                 type:Date,
                 required:true
             },
             to :{
                 type:Date,
                 required:true
             }
         }
        ],
        required:true
     },
    coverImage:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


module.exports = mongoose.model('nudge',nudgeSchema)