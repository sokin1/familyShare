function Group( gID, gName, gOwner, status ) {
	var groupId = gID;
	var groupName = gName;
	var groupOwner = gOwner;
	var curStatus = status;
	// Status
	//	Updated		: there are updates after you logged out.

	// All setters are called by GroupManger when group is created.
	// Getter are called by verified and authenticated users.
	this.getGroupId = function() {
		return groupId;
	}

	var setGroupId = function( gID ) {
		groupId = gID;
	}

	var setGroupName = function( gName ) {
		groupName = gName;
	}

	this.getGroupName = function() {
		return groupName;
	}

	var setGroupOwner = function( gOwner ) {
		groupOwner = gOwner;
	}

	this.getGroupOwner = function() {
		return groupOwner;
	}

	var setCurStatus = function( status ) {
		curStatus = status;
	}

	this.getCurStatus = function() {
		return curStatus;
	}
}

module.exports = Group;