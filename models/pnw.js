const mongoose = require('mongoose')

const pnwSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgA: { type: String },
  imgB: { type: String },
  imgC: { type: String },
  textA: { type: String },
  textB: { type: String },
  textC: { type: String },
  hA: { type: String },
  hB: { type: String },
  hC: { type: String },
  mapImg: { type: String },
  map: { type: String },
  description: { type: String },
})

const PNW = mongoose.model('PNW', pnwSchema)

module.exports = PNW
