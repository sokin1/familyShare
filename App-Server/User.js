function User( uID, created, group, gList, status, condition ) {
	var userId = uID;
	var createdAt = created;
	var mainGroup = group;
    var groupList = gList;
	var curStatus = status;
	var conCondition = condition;
    var password;

	this.getUserId = function() {
		return userId;
	}

	this.getCreatedAt = function() {
		return createdAt;
	}

	this.getMainGroup = function() {
		return mainGroup;
	}
    
    this.getGroupList = function() {
        return gList;
    }

	this.getCurStatus = function() {
		return curStatus;
	}

	this.getConCondition = function() {
		return conCondition;
	}

    // Used only for the signup and login process.
    this.setPassword = function( passwd ) {
        password = passwd;
    }
    
    this.getPassword = function() {
        return password;
    }
}

exports.User = User;