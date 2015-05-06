// TODO : Implement basic functionalities first.
//		: Then move on to the advanced ones.
function PostManager() {
	// This will access to DB and Files.
	// DB to get user and group information before retrieving posts list.
	// File to get actual post messages( additional access to files for images and reply)
	var ALLPOSTSFROMGROUP_REQ = 20001;
	var ALLPOSTSFROMUSER_REQ = 20002;
	var RANGEDPOSTSFROMGROUP_REQ = 20003;
	var RANGEDPOSTSFROMUSER_REQ = 20004;
	var CREATENEWPOSTS_REQ = 20005;
	var EDITPOSTS_REQ = 20006;
	var DELETEPOSTS_REQ = 20007;

	this.getGroupPosts = function( userId, groupId ) {
		// 1. Get groupId from DBManager.
		// 2. Retrieve Posts from File.
	}

	this.getUserPosts = function( userId ) {
		// 1. No need to access DBManager.
		// 2. Access to FileManager to get posts.
	}

	// Hack : Set from and with same value for single day posts.
	this.getRangedGroupPosts = function( userId, groupId, from, to ) {

	}

	this.getRangedUserPosts = function( userId, from, to ) {

	}

	this.postNewItem = function( post, callback ) {
		// TODO : Generate new file with post variable.
		//		: update post variable with filename
		//		: access db to update post table.
	}

	this.editItem = function( userId, groupId, item ) {

	}

	this.deleteItem = function( userId, groupId, postId ) {
		
	}

	var parsePostFile = function( ugpGroup, post ) {
		// TODO : new Post object will be instantiated, and stuffed.
		//		: new Comment object will also be instantiated, and stuffed in case there are comments.
	}

	var parsePostFiles = function( ugpGroup, postList ) {
		for( var post in postList ) {
			parsePostFile( ugpGroup, post );
		}
	}
}

module.exports = PostManager;