function UGPGroup( u, g, p ) {
	var user = u;
	var group = g;
	var post = p;

	this.getUser = function() {
		return user;
	}

	this.getGroup = function() {
		return group;
	}

	this.getPost = function() {
		return post;
	}
}