const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String, 
  password: String, 
  name: String,
  surname:String,
  sex:Boolean,
  age:Number,
  status:String,
  aboutMe:String
});

module.exports = mongoose.model('User', userSchema);
