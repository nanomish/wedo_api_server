var mongoose = require( 'mongoose' );

var listSchema = new mongoose.Schema({
  title: String,
  access: Array,
  date_created: { type: Date, default: Date.now },
  date_updated: Date,
  isDeleted: Boolean,
  isArchived: Boolean,
  test: String,
  updateTest: String
});

var List = module.exports = mongoose.model('List', listSchema);