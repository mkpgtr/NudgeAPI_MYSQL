const mongoose = require('mongoose')


const eventTypeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  
   
    
})


module.exports = mongoose.model('eventType',eventTypeSchema)