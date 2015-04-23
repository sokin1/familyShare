var User = require( "/App-Server/User" );
var Group = require( "/App-Server/Group" );
var Post = require( "/App-Server/Post" );

var UGPGroup = require( "./UGPGroup" );

function CookieManager() {

	this.validateCookies = function( cookieGeneral ) {
		var curTime = new Date().getTime();
		if( curTime - cookieGeneral['cookieCreated'] >= 1000000000 ) {
			cookieGeneral['status'] = 'INVALID';
		}
		cookieGeneral['cookieCreated'] = curTime;
	}

	// DESIGN : COOKIE Format **** MODIFIED ****
	//			General:
	//				verified=>[T/F/NONE]|
	//				cookieCreated=>[date:time]|
	//				status=>[status]|
	//				error=>[err_code],
	//			User:
	//				userId=>[uID]|
	//				userName=>[uName]|
	//				lastLogin=>[date:time]|
	//				status=>[status],
	//			Group:
	//				groupId=>[gID]|
	//				groupName=>[gName]|
	//				groupOwner=>[gOwner]|
	//				status=>[updated],
	//			Post:
	//				posts=>[postfile1@postfile2@ ... @postfile20]
	this.parseCookies = function( request ) {
	    var cookies = {},
	        body = request.headers.cookie;

	    body && body.split(",").forEach( function( section ) {
	    	var section_name = section.split( ":" ).shift().trim();
	    	var section_body = section.split( ":" )[1];
	    	cookies[section_name] = {};
	        section_body && section_body.split( "|" ).forEach( function( element ) {
	        	var prop = element.split( "=>" );
	        	var prop_body = element.split( "=>" )[1];
	        	cookies[section_name][prop.shift().trim()] = prop_body;
	        });
	    });

		return cookies;
	}

	// Builder-style
	this.retrieveInfoFromCookies = function( cookies ) {
		var userCookie = cookies['User'];
		var groupCookie = cookies['Group'];
		var postCookie = cookies['Posts'];

		var ugp = new UGPGroup();
		ugp.setUser( 
			userCookie['userId'],
			userCookie['userName'],
			groupCookie['groupId'],
			userCookie['status'],
			userCookie['condition']
		).setGroup( 
			groupCookie['groupName'],
			groupCookie['groupOwner'],
			groupCookie['gPostFile']['filename'],
			groupCookie['createdAt']
		).setPost( postCookie );

		return ugp;
	}

	var cookiesForStranger = function() {
		return "General:" +
						"verified=>NONE|" +
						"cookieCreated=>" + new Date().getTime() + "|" +
						"status=>NOCOOKIE,";
	}

	var cookiesForBeginner = function( user ) {
		return "General:" + 
						"verified=>TRUE|" +
						"cookieCreated=>" + new Date().getTime() + "|" +
						"status=>ONSIGNUP," +
			   "User:" +
						"UserId=>" + user.getUserId() + "|" +
						"userName=>" + user.getUserName() + "|" +
						"lastLogin=>" + user.getCurStatus() + "|" +
						"status=>" + user.getConCondition() + ",";
	}

	// TODO : post should be set here in the future.
	var cookiesForUser = function( user, group ) {
		return "General:" + 
						"verified=>TRUE|" +
						"cookieCreated=>" + new Date().getTime() + "|" +
						"status=>LOGIN," +
			   "User:" +
						"UserId=>" + user.getUserId() + "|" +
						"userName=>" + user.getUserName() + "|" +
						"lastLogin=>" + user.getCurStatus() + "|" +
						"status=>" + user.getConCondition() + "," +
			   "Group:" +
						"groupId=>" + group.getGroupId() + "|" +
						"groupName=>" + group.getGroupName() + "|" +
						"groupOwner=>" + group.getGroupOwner() + "|" +
						"status=>" + group.getCurStatus() + ",";
	}

	// TODO_LATER : Cookie is json format. Parents are "User", "Group", "Posts".
	//		  : Cookie is generated by builder pattern.
	this.generateCookies = function( user, group ) {
		if( user == null ) {
			return cookiesForStranger();
		} else {
			if( group == null ) {
				return cookiesForBeginner( user );
			} else {
				return cookiesForUser( user, group );
			}
		}
	}
}

module.exports = CookieParser;