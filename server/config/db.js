module.exports = function() {
  var username = 'apiuser';
  var password = 'apiuser';
	var config = {
		CONNECTION_STRING: 'mongodb://' + username + ':' + password + '@ds143539.mlab.com:43539/wedo',
	  CONNECTION_OPTIONS: {
      server:  { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } 
    }
  };

console.log('config connection string from db: ', config.CONNECTION_STRING);
  return config;
}
