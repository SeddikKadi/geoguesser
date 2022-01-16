const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
 /* map: {
    type: String,
    required: true
  },*/
  locations: {
    type: Array,
    required: true
  },
  /*zoom: {
    type: Number,
    required: true
  },
  center: {
    type: Array,
    required: true
  }*/
});
module.exports=mongoose.model("Game", GameSchema);