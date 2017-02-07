var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var config = require('../config/db.js')();
var userSchema = require('../schemas/user.js');
var User = mongoose.model('User', userSchema);


var db = mongoose.connection;

db.once('open', function() {
  //var User = mongoose.model('User', userSchema);
});

console.log('mongoose docs: http://mongoosejs.com/docs/index.html');
console.log('db config: ', config.connection);
mongoose.connect(config.connection);
 
var auth = {
 
  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = req.body.password || '';
    console.log(' req.body.username', req.body.username); 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validateDB(username, password);
   
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    if (dbUserObj) {
 
      // If authentication is success, we will generate a token
      // and dispatch it to the client
 
      res.json(genToken(dbUserObj));
    }
 
  },

  signup: function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';

		if (!username || username == '' || !password || password == '') {
			res.status(401);
			res.json({
				"status": 401,
				"message": "Invalid credentials" });
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
          u.save(function(err, thor) {
          if (err) return console.error(err);
            console.log(thor);
          });
          res.status(200);
          res.json({"status": 200, "message": "success"});
          return;
        }
    });
		return;		
  },

  isUniqueUser: function(username) {
    User.findOne({username: username}, function(err, user) {
      console.log('isUniqueUser() - user:', user);
      console.log('isUniqueUser() - err :', err);
      if (!!user) return true;
      return false;
    });
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
