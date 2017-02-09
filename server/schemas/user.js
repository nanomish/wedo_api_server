var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
  username:  {type: String, unique: true},
  password: String,
  date: { type: Date, default: Date.now },
});

var User = module.exports = mongoose.model('User', userSchema);