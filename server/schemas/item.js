var mongoose = require( 'mongoose' );

var itemSchema = new mongoose.Schema({
  title: String,
  created_by: Date,
  date_created: { type: Date, default: Date.now },
  date_updated: Date,
  isDeleted: Boolean,
  isArchived: Boolean,
  pictures: Array,
});

var Item = module.exports = mongoose.model('Item', itemSchema);