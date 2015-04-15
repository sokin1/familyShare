// 90% of times, it works with Cookies, 10% is login and signup procedures.
function User( uID, uName, group, status, condition ) {
	var userId = uID;
	var userName = uName;
	var mainGroup = group;
	var curStatus = status;
	// Status
	//	null		: Currently logged in.
	//	timestamp	: Not logged in( last logout time ) 
	var conCondition = condition;
	// CONDITION:
	//	SIGNUP_VALIDATED 	: Succeeded until validation, encrypted password is created, but not registered into db.
	//	SIGNUP_REGISTERED 	: Succeeded until registration, registered into db, but file is not created.
	//	SIGNUP_FILECREATED	: File is created for the user.
	//	*** For now, it is used only for sign up.
    var password;

	this.getUserId = function() {
		return userId;
	}

	this.setUserId = function( uID ) {
		userId = uID;
	}

	this.getUserName = function() {
		return userName;
	}

	this.setUserName = function( uName ) {
		userName = uName;
	}

	this.setMainGroup = function( group ) {
		mainGroup = group;
	}

	this.getMainGroup = function() {
		return mainGroup;
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
}

module.exports = User;