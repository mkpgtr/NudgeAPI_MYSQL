const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['attendee','moderator','admin'],
    }
})


module.exports = mongoose.model('user',userSchema)