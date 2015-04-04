var fs = require( "fs" );
var ejs = require( "ejs" );
var User = require( "../App-Server/User" );
var Error = require( "../type/Error" );

function Canvas() {
    this.renderInitial = function( response, state ) {
        response.statusCode = 200;
        response.setHeader( "Content-Type", "text/html" );
        response.setHeader( "Set-Cookie", [ 
            "userName=none",
            "groupName=none",
            "fileName=none",
            "verified=false",
            "lastLogin=null",
            "lastModified=null",
            "isModified=false"]
        );

        if( state == null ) {   // First page.
            fs.readFile( "./html/initial.html", 'utf-8', function( err, text ) {
                var renderedHtml = ejs.render( text, { errorNo: 0 } );
                response.write( renderedHtml );
                response.end();
            });
        } else if( state instanceof Error ) {   // Error in login or sign up
            response.writeHead( 200, { "Content-Type": "text/html" } );
            fs.readFile( "./html/initial.html", 'utf-8', function( err, text ) {
                var renderedHtml = ejs.render( text, { errorNo: state.getErrorNo() } );
                response.end( renderedHtml );
            });
        } else {
            // If you are here, that means you are logged out.
            response.writeHead( 200, { "Content-Type": "text/html" } );
            fs.readFile( "./html/initial.html", 'utf-8', function( err, text ) {
                var renderedHtml = ejs.render( text, { errorNo: 0 } );
                response.write( resnderedHtml );
                response.end();
            });
        }
    }

    // TODO : Need to do something about it.
    this.renderSetupPage = function( response, user ) {
        var curTime = new Date();
        var currentTime = curTime.getTime();
        response.writeHead( 200, {
            "Set-Cookie": "curStatus=setup," +
                          "username=" + user.getUserName() + "," +

                          "verified=true," +
                          "lastLogin=" + currentTime + "," +
                          "lastModified=" + currentTime,
            "Content-Type": "text/html" } );
        fs.readFile( "./html/setup.html", 'utf-8', function( err, text ) {
            var renderedHtml = ejs.render( text );
            response.write( renderedHtml );
            response.end();
        });
    }

    this.renderMain = function( response, user, userFile, group, groupFile ) {
        var curTime = new Date();
        var currentTime = curTime.getTime();
        response.writeHead( 200, {
            "Set-Cookie": "userName=" + user.getUserName() + "," +
                          "groupName" + group.getGroupName() + "," +
                          "fileName" + file.getFileName() + "," +
                          "verified=true," +
                          "lastLogin=" + currentTime + "," +
                          "lastModified=" + currentTime + "," +
                          "isModified=false",
            "Content-Type": "text/html" } );
        fs.readFile( "./html/main.html", 'utf-8', function( err, text ) {
            var renderedHtml = ejs.render( text, { username: userName, groupname: groupName } );
            response.end( renderedHtml );
        });
    }

    this.renderStylesheet = function( response, pathname ) {
        fs.readFile( "." + pathname, function( err, text ) {
            if( err ) throw err;
            else {
                response.writeHead( 200, { "Content-Type": "text/css" } );
                response.write( text );
                response.end();
            }
        });
    }
}

module.exports = Canvas;
