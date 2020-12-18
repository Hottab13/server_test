const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nestSchema = new Schema({
  name: String,
  location: String,
  type: String,
  date:String,
  time:String,
  ageRestrictions:Number,
  amountMaximum:Number,
  userId:String
});

module.exports = mongoose.model('Nest', nestSchema);
