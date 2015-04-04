var crypto = require( 'crypto' );

function CryptoManager() {
	var algorithm = 'aes-256-ctr';

	this.encryptString = function( target_str ) {
		var password = 'W1Ornr123';
		var cipher = crypto.createCipher( algorithm, password );
		var crypted = cipher.update( target_str, 'utf8', 'hex' );
		crypted += cipher.final( 'hex' );

		return crypted;
	}

	this.decryptString = function( enc_text ) {
		var password = 'W1Ornr123';
		var decipher = crypto.createDecipher( algorithm, password );
		var decrypted = decipher.update( enc_text, 'utf8', 'hex' );
		decrypted += decipher.final( 'hex' );

		return decrypted;
	}

	// NO decryptPasswd required.
	this.encryptPasswd = function( userid, createdAt, passwd ) {
		var password = userid + createdAt;
		var cipher = crypto.createCipher( algorithm, password );
		var crypted = cipher.update( passwd, 'utf8', 'hex' );
		cryptedPasswd += cipher.final( 'hex' );

		return cryptedPasswd
	}
}

module.exports = CryptoManager;