const express = require('express')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
const YAML = require('yamljs');
const helmet = require('helmet')
const xss = require('xss-clean')
const multer = require('multer')
const rateLimiter = require('express-rate-limit')
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const nudgeRoutes = require('./routes/nudgeRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const subCategoryRoutes = require('./routes/subCategoryRoutes.js')
const eventRoutes = require('./routes/eventRoutesXP.js')
const eventImageRoute = require('./routes/eventImageRoute.js')
const nudgeImageRoutes = require('./routes/nudgeImageRoute.js')
const base_url = 'api/v3/app'
const pool = require('./mysql-config/mysql-credentials.js')
const cors = require('cors')



// ! disabled these so that testing can be rapid


// app.set('trust proxy', 1)
// app.use(rateLimiter({ 
//     windowMs:15 * 60 * 1000,
//     max: 100
// }))
app.use(cors())
app.use(express.json())
// app.use(helmet())
// app.use(xss())


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



app.use(`/${base_url}/events`,eventRoutes)
app.use(`/${base_url}/categories`,categoryRoutes)
app.use(`/${base_url}/subcategories`,subCategoryRoutes)
app.use(`/${base_url}/nudge`,nudgeRoutes)
app.use(`/${base_url}/images`,eventImageRoute)
app.use(`/${base_url}/nudge/image`,nudgeImageRoutes)
app.use(`/${base_url}/users`,userRoutes)
app.use(`/${base_url}/images`,eventImageRoute)



const port = process.env.SERVER_PORT || 5000

app.listen(5000,()=>{
    console.log(`app is running on port ${port}`)
})
