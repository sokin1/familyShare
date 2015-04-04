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

	// item is wrapped object containing subject, contents, and images
	// used only for posting new item and editing item
	this.postNewItem = function( userId, groupId, item ) {

	}

	this.editItem = function( userId, groupId, item ) {

	}

	this.deleteItem = function( userId, groupId, postId ) {
		
	}
}

module.exports = PostManager;