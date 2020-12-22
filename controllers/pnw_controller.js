const express = require('express')
const pnw = express.Router()
// const PNW = require('../models/pnw.js')

// Index
pnw.get('/', (req, res) => {
  // PNW.find({}, (error, allLocations) => {
  //   res.render('tryon-experiences/index.ejs', {
  //     locations: allLocations
  //   })
  // })
  res.send("hello")
})




module.exports = pnw;
