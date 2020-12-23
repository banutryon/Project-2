const mongoose = require('mongoose')

const pnwSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String },
})

const PNW = mongoose.model('PNW', fruitSchema)

module.exports = PNW
