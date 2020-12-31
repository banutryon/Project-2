// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')

// CONFIGURATION
const app = express()
const db = mongoose.connection
require('dotenv').config()
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

// DATABASE
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

// MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUnintialized: false
  })
)

// Controllers
const pnwController = require('./controllers/pnw_controller.js')
app.use('/tryon-experiences', pnwController)

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

// Routes
app.get('/', (req, res) => {
  res.redirect('/tryon-experiences')
})

  // Listener
  app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
 })
