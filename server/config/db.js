module.exports = function() {
	var username = 'apiuser';
	var password = 'apiuser';
	return {
		connection: 'mongodb://' + username + ':' + password + '@ds143539.mlab.com:43539/wedo'
	};
}
