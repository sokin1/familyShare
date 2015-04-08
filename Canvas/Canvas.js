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

        if( state instanceof Error ) {   // First page.
            fs.readFile( "./html/initial.html", 'utf-8', function( err, text ) {
                var renderedHtml = ejs.render( text, { errorNo: state.getErrorNo() } );
                response.end( renderedHtml );
            });
        } else {
            fs.readFile( "./html/initial.html", 'utf-8', function( err, text ) {
                var renderedHtml = ejs.render( text, { errorNo: 0 } );
                response.end( renderedHtml );
            });
        }
    }

    // TODO : Need to do something about it.
    // TODO : New user configuration will be done in this page.
    //        New user will set his nick name and additional information
    //        Those are stored in DB and Cookie.
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

    // TODO : TOO MANY PARAMETERS
    //      : Main page is supposed to show,
    //          basic user info on the left.
    //              retrieved from the user object.
    //                  acquired from db-read
    //          basic group info on the right.
    //              retrieved from the group object
    //                  acquried from db-read
    //          posts on the group in the middle.
    //              retrieved from groupFile object.
    //                  Need to specify this part further.
    //                  If groupFile object is containing all posts on the group,
    //                  it will get too big, and will take forever to retrieving.
    //                  Good to have references of posts files, for example.
    this.renderMain = function( response, user, group ) {
        var curTime = new Date();
        var currentTime = curTime.getTime();
        response.writeHead( 200, {
            "Set-Cookie": "userName=" + user.getUserName() + "," +
                          "groupName" + group.getGroupName() + "," +
                          "verified=true," +
                          "lastLogin=" + currentTime + "," +
                          "isModified=false",
            "Content-Type": "text/html" } );

        var renderingParams = {
            username: user.getUserName(),
            groupname: group.getGroupName(),

        };

        fs.readFile( "./html/main.html", 'utf-8', function( err, text ) {
            var renderedHtml = ejs.render( text, renderingParams );
            response.end( renderedHtml );
        });
    }

    var renderLeft = function( response ) {

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
