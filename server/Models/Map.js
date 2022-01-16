const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  polygon: {
    type: Array,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  zoom: {
    type: Number,
    required: true
  },
  center: {
    type: Array,
    required: true
  }
})
module.exports=mongoose.model("Map",MapSchema);