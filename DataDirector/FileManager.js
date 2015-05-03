// RULE : NO ACCESS TO DB from FileManager. It only accesses to file
var fileContentManager = require( "./FileContentManager" );
var cypherManager = require( "../helper/CryptoManager" );
var fs = require( 'fs' );

// DESIGN : No files for users and groups.
//			Only for posts.
//			Need to design further with data handling model.
function FileManager() {
	this.request = function( reqBody, callback ) {
		if( reqBody.REQ_TYPE == 'REQ_GETFILELIST' ) {

		} else if( reqBody.REQ_TYPE == 'REQ_WRITETOFILE' ) {

		} else if( reqBODY.REQ_TYPE == 'REQ_READFROMFILE' ) {

		}
	}

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
/*
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
*/
/*
	// WHAT IT TAKES :
	//					1. List of userList file of the group.
	//					2. List of posts files of the group.
	// FORMAT :
	//					{
	//						'HashedGroupKey': "hashed group key value",
	//						'userFiles': [hashedFileName1, hashedFileName2, ...],
	//						'postFiles': [hashedFileName1, hashedFileName2, ...]
	//					}
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
*/

	// TODO_FUTURE : Need some kind of well distributed file management system to act as the director of all files.
	// post : wrapper object indicating posted item, and is used to make post procedure efficient.
	// WHAT IT TAKES :
	//					1. list of post files for the group.
	// FORMAT :
	//					{
	//						'post': [hashedFileName1, hashedFileName2, ...]
	//					}
	this.createPostListFile = function( group ) {
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

	this.createPostFile = function( post ) {

	}

	this.updateGroupFile = function( groupname, postID ) {

	}

	var get1PostFromFile = function( postFile ) {
		// use FileContentManager for retrieving contents from the file set.
		// TODO : FileContentManger will manage hash/unhash contents in the future.
	}

	var getAllPostFromFiles = function( postFileList ) {
		var posts = []
		for( postFile in postFileList ) {
			posts.add( get1PostFromFile( postFile ) );
		}

		return posts
	}

	// Retrieve only recent 20 post files from the group file.
	this.getPostsFromGroup = function( groupname ) {
		
	}

	this.getImageFromServer = function( imageFilePath ) {

	}
}

module.exports = FileManager;