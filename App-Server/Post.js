// Post Item Indicator
//   json format, and contents will be encrypted later.
//	 contains header and body.
//	 header:
//		author
// 		groupname
// 		createdAt
//	 body:
//		title
//		contents
//		filenames !@#Filename#@!
//		reply
//			1
//			2
//			...

function Post( uId, gId, when, fName, content, comments ) {
	var authorId = uId;
	var groupId = gId;
	var createdAt = when;

	var filename = fName;

	var title = content['title'];
	var body = content['body'];
	var comments = comments;

	this.setFileName = function( fname ) {
		filename = fname;
	}

	this.getFileName = function() {
		return filename;
	}

	// Parsing is done here.
	this.getJsonFormatForPost = function() {

	}

	this.getAuthorId = function() {
		return authorId;
	}

	this.getGroupId = function() {
		return groupId;
	}

	this.getCreatedAt = function() {
		return createdAt;
	}

	this.getTitle = function() {
		return title;
	}

	this.getBody = function() {
		return body;
	}

	this.getComments = function() {
		return comments;
	}

	this.getWrappedHeader = function() {
		// TODO : return header information including authorId, groupId, and createdAt
	}

	this.getWrappedBody = function() {
		// TODO : return body information including title, body, and comments.
	}
}

module.exports = Post