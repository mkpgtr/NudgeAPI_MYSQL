const express = require('express')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
const dbConfig = require('./config/dbConfig')
const YAML = require('yamljs');
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const nudgeRoutes = require('./routes/nudgeRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const eventRoutes = require('./routes/eventRoutes.js')
const eventTypeRoutes = require('./routes/eventTypeRoutes.js')
const eventImageRoute = require('./routes/eventImageRoute.js')
const subCategoryRoute = require('./routes/subCategoryRoutes.js')
const nudgeImageRoutes = require('./routes/nudgeImageRoute.js')
const authRoutes= require('./routes/authRoutes')
const base_url = 'api/v3/app'
const pool = require('./mysql-config/mysql-credentials.js')
const cors = require('cors')

app.get('/random',async(req,res)=>{

    const result = await pool.query("select * from events")
    
        
   // in mysql version of events & nudge api, it is not so easy to just assign an array to a key in the object
   // i am doing a nested loop here.

   // this has taken more than 2 hours atleast. forEach method did not work

   // i am loving mysql more than ever. data consistency feels so easy here.
    // after linking two tables, there comes a dropdown box when we insert data in mysql using phpMyAdmin.
    

   // after two hours of trying, I finally suceeded in generating a json response the way I wanted.

   //this code happened in flow state. it is 2:44AM. I am overflowing with gratitude :))
     for(var i =0;i<result[0].length;i++){

        let attendeesResult =  await pool.query(`select attendee_id from attendees where event_id=${result[0][i]?.id} `)
       
        result[0][i].attendees = attendeesResult[0]

     }



    console.log(result[0])
    
    res.json({data:result[0]})
})




app.set('trust proxy', 1)
app.use(rateLimiter({ 
    windowMs:15 * 60 * 1000,
    max: 100
}))
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(`/${base_url}/auth`,authRoutes)
app.use(`/${base_url}/events`,eventRoutes)
app.use(`/${base_url}/nudge`,nudgeRoutes)
app.use(`/${base_url}/nudge/image`,nudgeImageRoutes)
app.use(`/${base_url}/users`,userRoutes)
app.use(`/${base_url}/images`,eventImageRoute)
app.use(`/${base_url}/eventCategory`,eventTypeRoutes)
app.use(`/${base_url}/subCategory`,subCategoryRoute)



const port = process.env.PORT || 5000

app.listen(5000,()=>{
    console.log(`app is running on port ${port}`)
})
