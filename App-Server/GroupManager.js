// TODO : Tier1 functionality
//			-> create group
//			-> send invitation
//			-> choose group
//			-> retrieve group info
// 		: Tier2 functionality
//			-> register user
//			-> unregister user
//			-> enter other group
//			-> search group by name
//		: Tier3 functionality
//			-> messaging between group members
//			-> broadcasting to members
function GroupManager() {
	// DESIGN : it doesn't do any role for login, little bit of work for sign up.
	//			mostly, it will handle group related requests.
	this.serviceDispatcher = function( req, appserver, callback ) {
		if( req.REQ_TYPE == 'GRP_CREATEGROUP' ) {
			// TODO : PARAM should be Group object
		} else if( req.REQ_TYPE == 'GRP_SENDINVITATION' ) {
			// TODO : PARAM should be Invitation object
		} else if( req.REQ_TYPE == 'GRP_GETGROUPINFO' ) {
			// TODO : PARAM should be Group object
		} else if( req.REQ_TYPE == 'GRP_GETGROUPLIST' ) {
			// TODO : PARAM should be User object
		} else {

		}
	}

	var createGroup = function( group, callback ) {
		var req = new Request();
		req.REQ_TYPE = 'DB_NEWGROUP';
		req.PARAM = group;

		appserver.dbManager.request( req, function( rtn ) {
			if( rtn instanceof Error ) callback( rtn );
			else callback( group );
		});
	}

	var getGroupList = function( user ) {
		// Access groupUser list to retrieve group name list
		var groupList = [];

		DBManager.request( req, function( rtn ) {
			if( rtn instanceof Error)
			else if( rtn == null ) {
				return ERROR_NO_GROUP_AVAILABLE;
			}
			return groupNameList;
		});
	}
}

module.exports = GroupManager;