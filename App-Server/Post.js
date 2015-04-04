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

function Post( uname, gname, when, title, contents ) {
	var author = uname
	var groupname = gname
	var createdAt = when

	var filename

	var title = title
	var contents = contents
	// No reply since this object is used only for creation of posts

	this.getJsonFormatForPost = function() {

	}

	this.rtnHeader = function() {

	}

	this.rtnBody = function() {

	}

	this.rtnPost = function() {

	}
}

module.exports = Post