var rtnType = require( "/type/ReturnType.js" );
var errType = require( "/type/ErrorType.js" );
var CookieParser = require( "/helper/CookieParser.js" );

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
				signup( extractedInfo, cookies, appserver, function() {
					var retVal;
					callback( retVal );
				});
			} else if ( pathname == 'login' ) {
				login( extractedInfo, cookies, appserver, function() {
					var retVal;
					callback( retVal );
				});
			} else if ( pathname == '/' ) {
				var retVal = rtnType.TOMAIN;
				callback( retVal )
			}
		});
	}

	var signup = function( extractedInfo, cookies, appserver, callback ) {
		var newUser = new User( extractedInfo['userId'], 'now', null, null, 0, null );
		var validator = new Validator();
		validator.validateSignupInfo( newUser, extractedInfo['passwd'], extractedInfo['retypedPasswd'], function( res ) {
			if( res isInstanceof( Error ) ) {
				callback( res );
			} else {
				// TODO : Write info on the cookie to avoid multiple db access.
				appserver.dbManager.processSignup( newUser, res.getItem()['passwd'], function( res ) {
					callback( res );
				});
			}
		});
	}

	var login = function( extractedInfo, cookies, appserver, callback ) {
		// TODO : If cookie is valid and not expired, login is successful.
		//      : If cookie is expired, call validator to access dbmanager.
		//		: If cookie is not expired, go to the group page where the user were staying before logoff
		//		: IF cookie is expired, after renew cookie, go to main group page.
	}
}

exports.UserManager = UserManager;