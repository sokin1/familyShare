var User = require( "/App-Server/User" );
var Group = require( "/App-Server/Group" );
var Post = require( "/App-Server/Post" );

var UGPGroup = require( "./UGPGroup" );

function CookieManager() {
	this.retrieveInfoFromCookies = function( cookies ) {
		if( cookies['verified'] == 'false' ) {
			return null;
		} else {
			var user = new User(/*Info retrieved from cookie*/);
			var group = new Group(/*Info retrieved from cookie*/);
			var post = new Post(/*post list from post file*/)
		}

		return new UGPGroup( user, group, post );
	}

	// TODO : retrieveInfoFromCookies can be done here
	this.parseCookies = function( request ) {
	    var list = {},
	        rc = request.headers.cookie;

	    rc && rc.split(';').forEach( function( cookie ) {
	        var parts = cookie.split( '=' );
	        list[parts.shift().trim()] = decodeURI( parts.join( '=' ) );
	    });

	    return list;
	}

	var cookiesForStranger = function() {
		return { "verified" : "false" };
	}

	var cookiesForBeginner = function( user ) {
		return {
			["verified"]: "true",
			["user"]: {
				["userName"]: user.getUserName(),
				["userFile"]: user.getUserFile(),
				["group"]: "null"
			}
		};
	}

	var cookiesForUser = function( user, group ) {
		return {
			["verified"]: "true",
			["user"]: {
				["userName"]: user.getUserName(),
				["userFile"]: user.getUserFile(),
				["group"]: {
					["groupName"]: group.getGroupName(),
					["groupOwner"]: gorup.getGroupOwner(),
					["groupFile"]: group.getGroupFile(),
				}
			}
		};
	}

	this.generateCookies = function( user, group ) {
		var cookies = {};
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