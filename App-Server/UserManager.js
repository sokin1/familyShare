var rtnType = require( "../type/Return.js" );
var errType = require( "../type/Error.js" );
var CookieParser = require( "../helper/CookieParser.js" );

function UserManager() {
	this.serviceDispatcher = function( extractedInfo, appserver, callback ) {
		if( extractedInfo['type'] == 'signup' ) {
			signup( extractedInfo, appserver, function( rtnVal ) {
				if( rtnVal instanceof UGPGroup )
					callback( null, rtnVal );
				else
					callback( retVal, null );
			});
		} else if ( extractedInfo['type'] == 'login' ) {
			login( extractedInfo, cookies, appserver, function( rtnVal ) {
				if( rtnVal instanceof UGPGroup )
					callback( null, retVal );
				else
					callback( retVal, null );
			});
		}
		// TODO: MORE TO GO.
	}

	var signup = function( extractedInfo, appserver, callback ) {
		var newUser = new User( extractedInfo['userId'], 'now', null, null, 0, null );
		var validator = new Validator();
		var valid = validator.validateSignup( newUser, extractedInfo['passwd'], extractedInfo['retypedPasswd'] );
		if( valid instanceof User ) {
			// valid should be the instance of User with updated password.
			// TODO : Access to db to check duplicates and registration.
			// 		: For testing purpose, db functions will be replaced with mock functionality.
			appserver.dbManager.setUserInfo( valid, function( res ) {
				if( res instanceof User ) {
					// TODO : call filemanager and create file for user user.
					//		: newUser is updated if registration is succeeded.
					// 		: same as dbManager, replaced with mock functionality.
					appserver.fileManager.createFileForUser( res, function( res ) {
						// Should update user infomation more specifically.
						// TODO : Indicate his status to let the server know what should be done when he connects next time.
						// 		: also write the user infomation on the cookie 
						callback( res );
					});
				} else {
					callback( res );
				}
			});
		} else {
			callback( res );
		}
	}

	var login = function( extractedInfo, appserver, callback ) {
		// TODO : If cookie is valid and not expired, login is successful.
		//      : If cookie is expired, call validator to access dbmanager.
		//		: If cookie is not expired, go to the group page where the user were staying before logoff
		//		: IF cookie is expired, after renew cookie, go to main group page.
	}
}

module.exports = UserManager;
