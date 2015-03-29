var querystring = require( "querystring" );
var fs = require( "fs" );
var formidable = require( "formidable" );
var User = require( "./classes/User" );
var FormExtractor = require( "./classes/FormExtractor" );
var Error = require( "./classes/Error" );
var postRequest = require( "request" );

function checkLastModified( lastModified ) {
    return true;
}

function distributor( response, request, authenticator, canvas, cookie ) {
    console.log( cookie );
    var requestData = '';

    // TODO: Check cookie value, and if useris specified, go to main directly.
    request.on( 'data', function( data ) {
        requestData += data.toString();
    });

    request.on( 'end', function() {
        if( requestData == '' ) {
            start( response, canvas );
        }

        var extractor = new FormExtractor( requestData );
        var extractedInfo = extractor.extract();

        if( extractedInfo['type'] == 'start' ) {
            start( response, canvas );
        } else if( extractedInfo['type'] == 'signup' ) {
            signup( response, authenticator, extractedInfo['values'], canvas );
        } else if( extractedInfo['type'] == 'login' ) {
            login( response, authenticator, null, extractedInfo['values'], canvas );
        } else if( extractedInfo['type'] == 'setup' ) {
            setup( response, authenticator, extractedInfo['values'], canvas );
        }
    });
}

function setup( response, authenticator, extractedInfo, canvas ) {
    console.log( extractedInfo );
    authenticator.setupNewUser( extractedInfo, function( err, state ) {
        if( err ) throw err;
        if( state instanceof User ) {
            canvas.renderMain( response, 'newUser', 'None', 'None' );
        } else {
            canvas.renderMain( response, 'None', 'None', 'None' );
        }
    });
}

function start( response, canvas ) {
    canvas.renderInitial( response, null );
}

function signup( response, authenticator, extractedInfo, canvas ) {
    console.log( extractedInfo );
    authenticator.signupNewUser( extractedInfo, function( err, state ) {
        if( err ) throw err;
        if( state instanceof User ) {
            canvas.renderSetupPage( response, state );
        } else {
            canvas.renderInitial( response, state );
        }
    });
}

function login( response, authenticator, cookie, extractedInfo, canvas ) {
    if( cookie && cookie['verified'] && checkLastModified( cookie['lastModified'] ) ) {
        authenticator.getGroupInfo( 'cookieUser', function( err, group, posts ) {
            canvas.renderMain( response, 'cookie', group, posts );
        });
    } else {
        authenticator.authenticate( extractedInfo, function( err, state ) {
            if( err ) throw err;
            if( state instanceof User ) {
                authenticator.getGroupInfo( state, function( err, group, posts ) {
                    canvas.renderMain( response, user, group, posts );
                });
            } else {
                canvas.renderInitial( response, state );
            }
        });
    }
}

function stylesheet( response, pathname, canvas ) {
    console.log( "stylesheet called" );
    canvas.renderStylesheet( response, pathname );
}

exports.distributor = distributor;
exports.start = start;
exports.signup = signup;
exports.login = login;
exports.stylesheet = stylesheet;
