var mongoose = require('mongoose');
var _ = require('lodash');
var List = mongoose.model('List');
var User = mongoose.model('User');

var lists = {
 
  create: function(req, res) {
    var newlist = req.body;
    var newList = new List({
      title: req.body.title,
      access: [{"username": req.body.username, "type": 'rwd'}]
    });
    console.log('db ... creating new list, title:', req.body.title)
    newList.save(function(err, lst) {
      if (err) return console.error(err);
      res.status(200);
      res.json({"status": 200, "message": "success"});
      return;
    });
  },

  getOne: function(req, res) {
    console.log('list.getOne, params:', req.params)
    var id = req.params.id;
  
    return List.findOne({"_id": id}, function(err, list) {
      if (!!list) {
        console.log('found one list: ', list);
        res.status(200);
        res.json(list);
        return;
      }
      if (!!err) {
        console.log('error getting one: ', err);
        res.status(401);
        res.json({
          "status": 401,
          "message": err
        }); 
        return;
      }
    });
  },
 
  update: function(req, res) {
    var listObj = req.body;
    var id = req.params.id;

    List.findOne({id: req.body._id}, function(err, list){
      if (!!list) {
        list = _.extend(list, listObj, {"date_updated": new Date});
        console.log('found list to update (obj):', list);
        list.save(function(err, obj) {
          if(!!err) {
            res.status(401);
            res.json({
                "status": 401,
                "message": err
              });  
            console.error('error updating (save) list', list.title);
            return;
          } else {
            res.status(200);
            res.json({"status": 200, "message": "success"});
            console.log('updated saved list, ', list.title);
            return;
          }
        });
      } else {
        res.status(401);
        res.json({"status": 401, message: err})
      }
    
    });
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
