var mysql = require( 'mysql' );
var User = require( "../App-Server/User" );

function DBManager() {
    var db = mysql.createConnection({
        host : 'localhost',
        port : '3306',
        user : 'dbadmin',
        password : 'W1Ornr123',
        database : 'FamilyShare'
    });

    db.connect( function( err ) {
        if( err ) throw err;
    };

    this.request = function( reqBody, callback ) {
        if( reqBody.REQ_TYPE == "REQ_GETUSERINFO" || reqBody.REQ_TYPE == "REQ_LOGIN" ) {
            getUserInfo( reqBody.PARAM, function( err, rows ) {
                if( err ) callback( err );
                else {
                    var user = new User( rows[0]['userID'], rows[0]['userName'], rows[0]['mainGroup'], rows[0]['status'], rows[0]['condition'] );
                    reqBody.PARAM.setUser( user );
                    callback( null );
                }
            });
        } else if( reqBody.REQ_TYPE == "REQ_SIGNUP" ) {
            registerUser( reqBody.PARAM, function( err, rows ) {
                if( err ) callback( err, null );
                else {
                    var user = new User( rows[0]['userID'], rows[0]['userName'], rows[0]['mainGroup'], rows[0]['status'], rows[0]['condition'] );
                    reqBody.PARAM.setUser( user );
                    callback( null );
                }
            });
        }
        // TODO : Group and Post related requests are also handled here.
    }

    var getUserInfo = function( ugpGroup, callback ) {
        var user = ugpGroup.getUser();
        var key1 = user.getUserId();
        // password should be encrypted before coming to here.
        var key2 = user.getPassword();

        // What about fields?
        db.query( 'SELECT * FROM User WHERE userName = ? AND password = ?', [key1, key2], function( err, rows, fields ) {
            if( err ) callback( new Error( 'DBERROR-Cannot Run Query' ) );
            if else ( rows.length > 1 ) callback( new Error( 'DBERROR-Database crashed' ) );
            if else ( rows.length == 0 ) callback( new Error( 'USER-User is not registered' ) );
            else callback( rows );
        });
    }

    var registerUser = function( newUser, callback ) {
        // TODO : Modify query for insert
        var post = { userName : newUser['ID'], password : newUser['password'] };
        var key = userId;

        db.query( 'SELECT * FROM User WHERE userName = ?', [key], function( err, rows, fields ) {
            if( err ) callback( new Error( "DBError-Cannot Run Query" ) );
            if( rows.length >= 1 ) callback( new Error( "USER-User Already Registered" ) );
            } else {
                db.query( 'INSERT INTO User SET ?', post, function( err, result ) {
                    if( err ) callback( new Error( 'DBError-Cannot Run Query' ) );
                    else callback( newUser );
                });
            }
        });
    }

    this.getGroupInfo = function( user, callback ) {
        
    }

    this.setGroupInfo = function( group ) {
    }
}

module.exports = DBManager;