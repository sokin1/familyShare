var fs = require( "fs" );
var ejs = require( "ejs" );
var User = require( "../App-Server/User" );
var Group = require( "../App-Server/Group" );
var Error = require( "../type/Error" );
var UGPGroup = require( "../CookieManager/UGPGroup" );

function Canvas() {

    this.dispatchRenderer = function( response, data ) {
        if( data == null ) {
            renderInitial( response, null );
        } else {
            if( data['General']['status'] == 'NEW' || data['General']['status'] == 'INVALID' ) {
                renderInitial( response, data );
            } else if( data['General']['status'] == 'SIGNUP' ) {
                renderSetupPage( response, data['User'] );
            } else if( data['General']['status'] == 'USER' ) {
                renderMain( response, data['User'], data['Group'] );
            } else {
                renderUnKnown( response );
            }
        }
    }

    var renderInitial = function( response, state ) {
        var cookies = new CookieParser.generateCookies( null, null );

        response.statusCode = 200;
        response.setHeader( "Content-Type", "text/html" );
        response.setHeader( "Set-Cookie", cookies );

        if( state['General']['error'] instanceof Error ) {   // First page.
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
    var renderSetupPage = function( response, user ) {
        var cookies = new CookieParser.generateCookies( user, null );

        response.statusCode = 200;
        response.setHeader( "Content-Type", "text/html" );
        response.setHeader( "Set-Cookie", cookies );

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
    var renderMain = function( response, user, group ) {
        var cookies = new CookieParser.generateCookies( user, group );

        response.statusCode = 200;
        response.setHeader( "Content-Type", "text/html" );
        response.setHeader( "Set-Cookie", cookies );

        // TODO : Figure out how to carry rendering parameters
        //          IDEA : Separating centural, left, and right part.
        //                 and passing different parameters.
        var renderingParams = {
            username: user.getUserName(),
            groupname: group.getGroupName(),
            posts: group.get
        };

        fs.readFile( "./html/main.html", 'utf-8', function( err, text ) {
            var renderedHtml = ejs.render( text, renderingParams );
            response.end( renderedHtml );
        });
    }

    var renderLeft = function( response ) {

    }

    var renderRight = function( response ) {

    }

    var renderCenter = function( response ) {

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
