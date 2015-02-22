// RULE : NO ACCESS TO DB from FileManager. It only accesses to file
var contentGenerator = require( "/App-Server/ContentGenerator" );
var fs = require('fs');

function FileManager() {
	this.createFileForUser = function( userInfo, callback ) {
		// create post file for new user.
		// File name is acquired by hash username(email) additional information.
		// This file is used to get posts for user-related pages.

		// SCE1. If user post new item on the group page.
		//		1. new post file is created. with header and body information
		//		2. Filename is going to be the unique id of the post file.
		//		3. And this filename is updated on the group file and user file.

		var contents = contentGenerator.getUserFileContents( userInfo );
		var filename = "cyphertext filename";
		fs.writeFile( "/usr/meta/" + filename, contents, function( err ) {
			if( err ) {
				callback( null, err );
			} else {
				callback( filename, null );
			}
		});
	}

	thie.createFileForGroup = function( groupInfo, callback ) {
		var contents = "xml-format-group-info";
		var filename = "cyphertext filename";
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

exports.FileManager = FileManager;