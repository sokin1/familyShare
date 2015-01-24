function User( username, isNewUser ) {
    // User contains username, nickname, profile picture, and profile information.
    var userName = username;
    var nickName = null;
    var newUser = isNewUser;

    this.getNickName = function() {
        return nickName;
    }

    this.getUserName = function() {
        return userName;
    }

    this.isNewUser = function() {
        return newUser;
    }
}

module.exports = User;
