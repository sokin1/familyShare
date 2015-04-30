var cryptoManager = require ( '/helper/cryptoManager.js' );

function Validator() {
	var emailValidator = function( userEmail ) {
		// Do pattern matching with "userEmail" and compare it with original userEmail.
		// If they are same then it is valid user email address
		// If not, it is not valid format.
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
		// TODO : Signup is done here.
		// 		: 1. Check email is in valid format.
		if( emailValidator( newUser.getUserId ) == false ) {
			// Invalid
			return new Error( "InvalidEmailFormat" );
		} else {
		//		: 2. Check two passwords are matched.
			if( passwordValidator( passwd, retypedPasswd ) == false ) callback( new Error( "PasswordMisMatched" ) );
			// TODO : Do encryption here for passwd.
			var cryptoManager = new CryptoManager();
			var encryptedPasswd = cryptoManager.encryptPasswd( newUser.getUserId(), newUser.getCreatedAt(), passwd );

			newUser.setPassword( encryptedPasswd );
			newUser.setConCondition( "SIGNUP_VALIDATED" );

			return newUser;
		}
	}

	this.validateLogin = function( user, passwd, callback ) {
        if( emailValidator( user.getUserId ) == false ) {
            callback( new Error( "InvalidEmailFormat" ) );
        } else {
            var cryptoManager = new CryptoManager();
            var encryptedPasswd = cryptoManager.encryptPasswd( user.getUserId(), user.getCreatedAt(), passwd );
            user.setPassword( encryptedPasswd );
            callback( user );
        }
	}
}
