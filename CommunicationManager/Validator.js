var cryptoManager = require ( '/helper/cryptoManager.js' );

function Validator() {
	var emailValidator = function( userEmail ) {
		if( /^.*@.*\..*/.exec( userEmail ) == userEmail ) return true;
		return false;
	}

	var passwordValidator = function( passwd, retypedPasswd ) {
		if( passwd == retypedPasswd ) {
			return true;
		}
		return false;
	}

	this.validateSignup = function( newUser, passwd, retypedPasswd ) {
		if( emailValidator( newUser.getUserId ) == false ) {
			return new Error( "InvalidEmailFormat" );
		} else {
			if( passwordValidator( passwd, retypedPasswd ) == false ) callback( new Error( "PasswordMisMatched" ) );
			var cryptoManager = new CryptoManager();
			var encryptedPasswd = cryptoManager.encryptPasswd( newUser.getUserId(), newUser.getCreatedAt(), passwd );

			newUser.setPassword( encryptedPasswd );
			newUser.setConCondition( "SIGNUP_VALIDATED" );

			return newUser;
		}
	}

	this.validateLogin = function( ugpGroup, passwd, callback ) {
		var user = ugpGroup.getUser();

        if( emailValidator( user.getUserId ) == false ) {
            callback( new Error( "InvalidEmailFormat" ) );
        } else {
            var cryptoManager = new CryptoManager();
            var encryptedPasswd = cryptoManager.encryptPasswd( user.getUserId(), user.getCreatedAt(), passwd );
            user.setPassword( encryptedPasswd );
            callback( null );
        }
	}
}