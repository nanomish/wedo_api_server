var mongoose = require('mongoose');

//TODO - error handeling for connection to DB
var db = mongoose.connection;

var lists = {
 
  create: function(req, res) {
    var newlist = req.body;
    var newList = new List({
      title: req.body.title,
      access: [{username: req.body.username, type: 'rwd'}]
    });
    newList.save(function(err, lst) {
      if (err) return console.error(err);
      res.status(200);
      res.json({"status": 200, "message": "success"});
      return;
    });
  },
 
  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];
 
module.exports = lists;
