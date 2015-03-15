function User( uID, created, group, status, condition ) {
	var userId = uID;
	var createdAt = created;
	var mainGroup = group;
	var curStatus = status;
	var conCondition = condition;

	this.getUserId = function() {
		return userId;
	}

	this.getCreatedAt = function() {
		return createdAt;
	}

	this.getMainGroup = function() {
		return mainGroup;
	}

	this.getCurStatus = function() {
		return curStatus;
	}

	this.getConCondition = function() {
		return conCondition;
	}
}

exports.User = User;