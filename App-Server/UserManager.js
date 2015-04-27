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
		var newUser = new User( null, extractedInfo['userId'], null, null, null );
		new Validator().validateSignup( newUser, extractedInfo['passwd'], extractedInfo['retypedPasswd'] );
		if( newUser instanceof User ) {
			// valid should be the instance of User with updated password.
			// TODO : Access to db to check duplicates and registration.
			// 		: For testing purpose, db functions will be replaced with mock functionality.
			appserver.dbManager.registerUser( newUser, function( err ) {
				if( err != null ) {
					// TODO : call filemanager and create file for user user.
					//		: newUser is updated if registration is succeeded.
					// 		: same as dbManager, replaced with mock functionality.
					appserver.fileManager.createFileForUser( newUser, function( err ) {
						// Should update user infomation more specifically.
						// TODO : Indicate his status to let the server know what should be done when he connects next time.
						// 		: also write the user infomation on the cookie 
						callback( newUser );
					});
				} else {
					callback( err );
				}
			});
		} else {
			callback( newUser );
		}
	}

	var login = function( extractedInfo, appserver, callback ) {
		// DESIGN : If it comes here, that means cookie is not available, expired, or not valid.
		var user = new User( null, extractedInfo['userId'], null, null,null );
		new Validator().validateLogin( user, extractedInfo['passwd'] );
		// TODO : THIS IS SCARY!!!! FIX IT!!
		if( user instanceof User ) {
			appserver.dbManager.getUserInfo( user, function( err ) {
				if( err != null ) {
					var mainGroup = user.getMainGroup();
					if( mainGroup != null) {
						var group = new Group( mainGroup, null, null, null );
						appserver.dbManager.getGroupInfo( group, function( err ) {
							if( err != null ) {
								var posts = new Post();
								appserver.fileManager.openFileForUser( user, function( err ) {
								});
							} else {
								callback( err );
							}
						});
					} else {
						callback( user );
					}
				} else {
					callback( err );
				}
			});
		} else {
			callback( user );
		}
	}
}

module.exports = UserManager;
