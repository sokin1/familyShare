// RULE : NO ACCESS TO DB from FileManager. It only accesses to file
var fileContentManager = require( "./FileContentManager" );
var cypherManager = require( "../helper/CryptoManager" );
var fs = require( 'fs' );

function FileManager() {
	var buildFileName = function( info ) {
        if( info instanceof User ) {
            var fileName = info.getUserId() + "_" + info.getCreatedAt() + ".usr";
            var pin = info.getPassword();
        } else if( info instanceof Group ) {
            var fileName = info.getGroupId() + "_" + info.getCreatedAt() + ".grp";
            var pin = info.getGroupName();
        }

        return cryptoManager.encryptString( fileName, pin );
	}

	this.createFileForUser = function( newUser, callback ) {
		// create post file for new user.
		// File name is acquired by hash username(email) additional information.
		// This file is used to get posts for user-related pages.

		// SCE1. If user post new item on the group page.
		//		1. new post file is created. with header and body information
		//		2. Filename is going to be the unique id of the post file.
		//		3. And this filename is updated on the group file and user file.

		var contents = fileContentManager.getUserFileContents( newUser );
		var filename = buildFileName( newUser );
		fs.writeFile( "/usr/meta/" + filename, contents, function( err ) {
			if( err ) {
				callback( new Error( "File Creation Failed" ) );
			} else {
				newUser.setUserFileName( filename );
				callback( newUser );
			}
		});
	}

	this.createFileForGroup = function( groupInfo, callback ) {
		var contents = contentGenerator.getGroupFileContents( groupInfo );
		var filename = cryptoManager.encryptString( groupInfo );
		fs.writeFile( "/grp/meta/" + filename, contents, function( err ) {
			if( err ) {
				callback( null, err );
			} else {
				callback( filename, null );
			}
		});
	}

	// post : wrapper object indicating posted item, and is used to make post procedure efficient.
	this.createPostFile = function( username, groupname, post ) {
		var contents = contentGenerator.getPostContent( post );
		var filename = cryptoManager.encryptString( post );
		fs.writeFile( "/post/" + userDir + "/", contents, function( err ) {
			if( err ) {
				callback( null, err );
			} else {
				callback( filename, null );
			}
		});
	}

	// These two functions will be triggered by post function from postManager.
	this.updateUserFile = function( username, postID ) {

	}

	this.updateGroupFile = function( groupname, postID ) {

	}

	// Retrieve only recent 20 post files from the group file.
	this.getPostsFromGroup = function( groupname ) {

	}

	// Retrieve only recent 20 post files from the group file.
	this.getPostsFromUser = function( groupname ) {

	}

	this.getImageFromServer = function( imageFilePath ) {

	}
}

module.exports = FileManager;