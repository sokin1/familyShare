function Group( gName, gOwner, gPostFile, gCreatedAt ) {
	var groupName = gName;
	var groupOwner = gOwner;
	var postFile = gPostFile;
	var createdAt = gCreatedAt;

	// All setters are called by GroupManger when group is created.
	// Getter are called by verified and authenticated users.

	var setGroupName = function( gName ) {
		groupName = gName;
	}

	this.getGroupName = function() {
		return groupName;
	}

	this.setGroupOwner = function( gOwner ) {
		groupOwner = gOwner;
	}

	this.getGroupOwner = function() {
		return groupOwner;
	}

	this.setPostFile = function( gPostFile ) {
		postFile = gPostFile;
	}

	this.getPostFile = function() {
		return postFile;
	}

	this.setCreatedAt = function( gCreatedAt ) {
		createdAt = gCreatedAt;
	}

	this.getCreatedAt = function() {
		return createdAt;
	}
}

module.exports = Group;