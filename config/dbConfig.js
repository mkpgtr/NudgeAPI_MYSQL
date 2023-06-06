const mongoose = require('mongoose')

mongoose.connect(process.env.mongo_url,{
   useNewUrlParser : true,
   useUnifiedTopology : true
})

const connection = mongoose.connection;

connection.on('connected',()=>{
   console.log('mongodb connection successful')
})

connection.on('error',(err)=>{
   console.log('mongodb conenction failed',err)
})



