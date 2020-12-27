const mongoose = require('mongoose')

const pnwSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  description: { type: String },
})

const PNW = mongoose.model('PNW', pnwSchema)

module.exports = PNW
