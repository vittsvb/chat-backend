'use strict'

require('dotenv').config()

const express = require('express')
const cfenv = require('cfenv')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

let appEnv = cfenv.getAppEnv()

//Import route files
const assistantdRoutes = require('./routes/assistantRoutes')

//MongoDB connection
const mongoConnector = require('./connectors/mongoConnector')
mongoConnector.mongoConnect()

//Data parsers for the request body
app.use(express.json())

//Allowing CORS to FRONTEND requests in another domain
app.use(cors())

//Log responses to console
app.use(morgan('dev'))

//Log all requests to access.log
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
        flags: 'a'
    })
}))

//Error handling
app.use((error, req, res, next) => {
    return res.status(500).send({
        error: error
    })
})

//Define the route files here
app.use('/assistant', assistantdRoutes)

//Starts the application server 
const port = 8080
app.listen(port, function () {
    console.log('Server running at: http://localhost:' + port)
})

module.exports = app
