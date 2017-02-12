var jwt = require('jwt-simple');
var mongoose = require('mongoose');
//var db_config = require('../config/db.js')();
//var User = mongoose.model('User', require('../schemas/user.js'));
var User = mongoose.model('User');
//TODO - error handeling for connection to DB
//var db = mongoose.connection;

//console.log('mongoose docs: http://mongoosejs.com/docs/index.html');

//mongoose.connect(db_config.connection, db_config.options);
 
var auth = {
 
  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = req.body.password || '';
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    console.log('validating user, ', username);
    User.findOne({username: username, password: password}, function(err, user) {
      if (!!user) {
        res.json(genToken(user));
        //console.log('response: ', res);
        //console.log('request: ', req);
      } else {
       res.status(401);
       res.json({
          "status": 401,
          "message": err
        }); 
      }
    console.log('User ' + req.body.username + ' logged in');
    return;        
    });
  },

  signup: function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';

		if (!username || username == '' || !password || password == '') {
			res.status(401);
			res.json({
				"status": 401,
				"message": "Invalid credentials" 
      });
			return;
		} 
    
    User.findOne({username: username}, function(err, user) {
        if (!!user) {
          res.status(401);
          res.json({"status": 401, "message": "This username is already in use"});
          return;
        } else {
          var u = new User({
             username: req.body.username,
             password: req.body.password
          });
          u.save(function(err, obj) {
          if (err) return console.error(err);
            console.log(obj);
          });
          res.status(200);
          res.json({"status": 200, "message": "success"});
          return;
        }
    });
		return;		
  },

	validateDB: function(user, pass) {
		for (var i=0; i< DB_USERS.length; i++) {
      if (DB_USERS[i].username == user && DB_USERS[i].password == pass) return true;
    } 
		return false;
	},

  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
 
  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'user',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  console.log('----------------------------------------------------------');
  console.log('TOKEN: ', token);
  console.log('----------------------------------------------------------');

  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

var DB_USERS = [
	{
		name: 'arvind',
    role: 'user',
    username: 'arvind@myapp.com',
    enc_password: '12345'
	}
]; 
module.exports = auth;
