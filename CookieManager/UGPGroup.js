// Package used for rendering main page
function UGPGroup() {
	var user;
	var group;
	var posts;

	this.getUser = function() {
		return user;
	}

	this.setUser = function( userId, userName, groupId, status, condition ) {
		user = new User( userId, userName, groupId, status, condition );

		return this;
	}

	this.getGroup = function() {
		return group;
	}

	this.setGroup = function( groupName, groupOwner, postFile, createdAt ) {
		group = new Group( groupName, groupOwner, postFile, createdAt );

		return this;
	}

	this.getPost = function() {
		return posts;
	}

	this.setPost = function( postFileList ) {
		posts = [];
		return this;
	}
}