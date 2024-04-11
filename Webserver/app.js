const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const index = require('./Routes/webserver')
const session = require('express-session')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}))

app.use('/', index.routes)

app.listen(3000)
