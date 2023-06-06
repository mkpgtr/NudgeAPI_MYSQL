const mongoose = require('mongoose')


const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    parentCategory:{
        type:mongoose.Types.ObjectId,
        ref:'eventType',
        required:true
    }
  
})


module.exports = mongoose.model('subCategory',subCategorySchema)