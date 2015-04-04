// Group only contains keys of users and items, not objects.
// Group, Item, and Users are doesn't know each others.

// Need to build Request/Response object wrapping up request/response information for every request done to DBManager.
var GROUPLIST_REQ = 10001;
var USERLIST_REQ = 10002;
var USERREGISTRATION_REQ = 10003;
var USERUNREGISTRATION_REQ = 10004;
var GROUPREGISTRATION_REQ = 10005;
var GROUPUNREGISTRATION_REQ = 10006;

function GroupManager() {
	this.getGroupList = function( userId ) {
		// Access groupUser list to retrieve group name list
		DBManager.request( GROUPLIST_REQ, userId, function( groupNameList ) {
			if( groupNameList == null ) {
				return ERROR_NO_GROUP_AVAILABLE;
			}
			return groupNameList;
		});
	}

	// return empty list for the group with 0 users.
	// return null only if invalid group id( no group registered under id or requester doesn't belong to the group ).
	this.getUserList = function( userId, groupId ) {
		DBManager.request( USERLIST_REQ, groupId, function( userNameList ) {
			if( userNameList == null ) {
				return ERROR_INVALID_GROUP_ID;
			}
			return userNameList;
		});
	}

	this.registerNewUser = function( userId, groupId ) {
		DBManager.request( USERREGISTRATION_REQ, userId, groupId, function( error_msg, responseFromDB ) {
			if( error_msg ) return error_msg;
			return responseFromDB;
		});
	}

	this.unregisterUser = function( userId, groupId ) {
		DBManager.request( USERUNREGISTRATION_REQ, userId, groupId, function( error_msg, responseFromDB ) {
			if( error_msg ) return error_msg;
			return responseFromDB;
		});
	}

	this.registerNewGroup = function( userId ) {
		DBManager.request( GROUPREGISTRATION_REQ, userId, function( error_msg, groupId ) {
			if( error_msg ) return error_msg;
			return groupId;
		});
	}

	// Only works when there is no user registered in the group.
	// And should be performed by group owner.
	this.unregisterGroup = function( userId, groupId ) {
		DBManager.request( GROUPUNREGISTRATION_REQ, userId, groupId, function( error_msg, responseFromDB ) {
			if( error_msg ) return error_msg;
			return responseFromDB;
		});
	}
}

module.exports = GroupManager;