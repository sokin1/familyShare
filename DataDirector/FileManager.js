// RULE : NO ACCESS TO DB from FileManager. It only accesses to file
var fileContentManager = require( "./FileContentManager" );
var cypherManager = require( "../helper/CryptoManager" );
var fs = require( 'fs' );

// DESIGN : No files for users and groups.
//			Only for posts.
//			Need to design further with data handling model.
//			AND DON'T FORGET THIS IS FILEMANAGER, NOT POSTMANAGER.
function FileManager() {
	this.request = function( reqBody, callback ) {
		// DESIGN : For File Creation, PARAM of request is Post object
		if( reqBody.REQ_TYPE == 'REQ_CREATENEWFILE' ) {
			createPostFile( reqBody.PARAM, function( rtn ) {
				callback( rtn );
			});
		} else if( reqBody.REQ_TYPE == 'REQ_REMOVEFILE' ) {
			getMostRecentPostList( reqBody.PARAM, function( rtn ) {

			});
		} else if( reqBody.REQ_TYPE == 'REQ_MODIFYFILE' ) {
			writeToFile( reqBody.PARAM, function( err ) {

			});
		}
	}

	var getMostRecentFileList = function( post, callback ) {
		var posts = [];
		// 1. Open file according to the path specified in post variable.( NO NEED TO ACCESS DB )
		// 2. Do parsing for each file as posts element.
		// 3. return posts variable.
	}

	var getMostRecentFile = function( post, callback ) {
		var post;
		// 1. open the most recent post( NO NEED TO ACCESS DB )
		// 2. Do parsing it to post.
		// 3. return post variable.
	}

	var getPostAfterLastUpdate = function( post, callback ) {
		// TODO : Will be tricky.
	}

	var buildFileName = function( post ) {
		var bfEncrypted = post.getAuthorId() + post.getTitle() + post.getGroupId();
		var afEncrypted = cryptoManager.encryptString( bfEncrypted );

		return afEncrypted + "<$>" + post.createdAt() + "</$>";
	}

	var createNewFile = function( post, callback ) {
		var contents = contentGenerator.getPostContent( post );
		var filename = buildFileName( post );
		var groupId = post.getGroupId();
		var hashedGroupId = cryptoManager.encryptString( groupId );

		fs.writeFile( "/" + hashedGroupId + "/post/" + filename, contents, function( err ) {
			if( err ) callback( new Error( "Failed to create file" ) );
			else callback( filename );
		});
	}
}

module.exports = FileManager;