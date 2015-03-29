var cryptoManager = require ( '/helper/cryptoManager.js' );

function Validator() {
	var.emailValidator = function( userEmail ) {
		// Do pattern matching with "userEmail" and compare it with original userEmail.
		// If they are same then it is valid user email address
		// If not, it is not valid format.
		if( /^.*@.*\..*/.exec( userEmail ) == userEmail ) return true;
		return false;
	}

	var.passwordValidator = function( passwd, retypedPasswd ) {
		if( passwd == retypedPasswd ) {
			return encryptedPasswd;
		}
		return false;
	}

	this.validateSignup = function( newUser, passwd, retypedPasswd, callback ) {
		// TODO : Signup is done here.
		// 		: 1. Check email is in valid format.
		if( emailValidator( newUser.getUserId ) == false ) {
			// Invalid
			callback( new Error( "InvalidEmailFormat" ) );
		} else {
		//		: 2. Check two passwords are matched.
			if( passwordValidator( passwd, retypedPasswd ) == false ) callback( new Error( "PasswordMisMatched" ) );
		//		: 3. Access to dbmanager for checking duplicated user
		//		: 4. If all clear, create new user info in the db.
			// TODO : Do encryption here for passwd.
			var cryptoManager = new CryptoManager();
			var encryptedPasswd = cryptoManager.encryptPasswd( newUser.getUserId(), newUser.getCreatedAt(), passwd );
		//		: 5. call filemanager for create new user files.
		//		: 6. return signup response, if 1-3 is not clear, it comes here directly.
		}
	}

	this.validateLogin = function( user, passwd, callback ) {

	}
}