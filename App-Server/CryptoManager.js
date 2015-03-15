var crypto = require( 'crypto' );

function CryptoManager() {
	var algorithm = 'aes-256-ctr';
	var password = 'W1Ornr123';

	this.encryptString = function( target_str ) {
		var cipher = crypto.createCipher( algorithm, password );
		var crypted = cipher.update( target_str, 'utf8', 'hex' );
		crypted += cipher.final( 'hex' );

		return crypted;
	}

	this.decryptString = function( enc_text ) {
		var decipher = crypto.createDecipher( algorithm, password );
		var decrypted = decipher.update( enc_text, 'utf8', 'hex' );
		var orig_text += decipher.final( 'hex' );

		return orig_text;
	}
}