function User( uID, created, group, gList, status, condition ) {
	var userId = uID;
	var createdAt = created;
	var mainGroup = group;
    var groupList = gList;
	var curStatus = status;
	var conCondition = condition;
	// CONDITION:
	//	SIGNUP_VALIDATED 	: Succeeded until validation, encrypted password is created, but not registered into db.
	//	SIGNUP_REGISTERED 	: Succeeded until registration, registered into db, but file is not created.
	//	SIGNUP_FILECREATED	: File is created for the user.
	//	*** For now, it is used only for sign up.
    var password;
    var userFileName;

	this.getUserId = function() {
		return userId;
	}

	this.setCreatedAt = function( created ) {
		createdAt = created;
	}

	this.getCreatedAt = function() {
		return createdAt;
	}

	this.setMainGroup = function( group ) {
		mainGroup = group;
	}

	this.getMainGroup = function() {
		return mainGroup;
	}

	this.setGroupList = function( gList ) {
		groupList = gList;
	}
    
    this.getGroupList = function() {
        return gList;
    }

    this.setCurStatus = function( status ) {
    	curStatus = status;
    }

	this.getCurStatus = function() {
		return curStatus;
	}

	this.setConCondition = function( condition ) {
		curCondition = condition;
	}

	this.getConCondition = function() {
		return conCondition;
	}

    // Used only for the signup and login process.
    // Only be encrypted password instead of plain password.
    this.setPassword = function( passwd ) {
        password = passwd;
    }
    
    this.getPassword = function() {
        return password;
    }

    this.setUserFileName = function( filename ) {
    	userFileName = filename;
    }

    this.getUserFileName = function() {
    	return userFileName;
    }
}

exports.User = User;