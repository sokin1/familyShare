var rtnType = require( "/type/ReturnType.js" );
var errType = require( "/type/ErrorType.js" );
var CookieParser = require( "/helper/CookieParser.js" );

// TODO : Delete ServiceDispatcher.
//		: 
function UserManager() {
	this.serviceDispatcher = function( request, pathname, appserver, callback ) {
		var cookies = CookieParser.parseCookies( request );

		request.on( 'data', function( data ) {
            requestData += data.toString();
        });

        request.on( 'end', function() {
        	var extractor = new FormExtractor();
            var extractedInfo = extractor.extract( requestData );

			if( pathname == 'signup' ) {
				signup( extractedInfo, cookies, appserver, function( newUser ) {
					if( newUser instanceof User ) {
						CookieParser.updateCookies( request, newUser );
					} else {
						callback( retVal );
					}
				});
			} else if ( pathname == 'login' ) {
				login( extractedInfo, cookies, appserver, function() {
					var retVal;
					callback( retVal );
				});
			} else if ( pathname == '/' ) {
				var retVal = rtnType.TOMAIN;
				callback( retVal );
			}
		});
	}

	var signup = function( extractedInfo, cookies, appserver, callback ) {
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

	var login = function( extractedInfo, cookies, appserver, callback ) {
		// TODO : If cookie is valid and not expired, login is successful.
		//      : If cookie is expired, call validator to access dbmanager.
		//		: If cookie is not expired, go to the group page where the user were staying before logoff
		//		: IF cookie is expired, after renew cookie, go to main group page.
	}
}

exports.UserManager = UserManager;
