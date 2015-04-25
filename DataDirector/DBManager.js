//var mysql = require( 'mysql' );
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
        if( reqBody.command == "REQ_GETUSERINFO" || reqBody.command == "REQ_LOGIN" ) {
            getUserInfo( reqBody.subject, function( err, rows ) {
                if( err ) callback( err, null );
                else callback( null, new User( rows[''], rows[''], rows[''], rows[''], rows[''] ) );
            });
        } else if( reqBody.command == "REQ_SIGNUP" ) {
            registerUser( reqBody, subject, function( err, rows ) {
                if( err ) callback( err, null );
                else callback( null, new User( rows[''], rows[''], rows[''], rows[''], rows[''] ) );
            });
        }
    }

    var getUserInfo = function( userInfo, callback ) {
        var key1 = userInfo['ID'];
        // password should be encrypted before coming to here.
        var key2 = userInfo['password'];

        // What about fields?
        db.query( 'SELECT * FROM User WHERE userName = ? AND password = ?', [key1, key2], function( err, rows, fields ) {
            if( err ) callback( new Error( 'DBERROR-Cannot Run Query' ), null );
            if else ( rows.length > 1 ) callback( new Error( 'DBERROR-Database crashed' ), null );
            if else ( rows.length == 0 ) callback( new Error( 'USER-User is not registered' ), null );
            else callback( null, rows );
        });
    }

    var registerUser = function( newUser, callback ) {
        // TODO : Modify query for insert
        var post = { userName : newUser['ID'], password : newUser['password'] };
        var key = userId;

        db.query( 'SELECT * FROM User WHERE userName = ?', [key], function( err, rows, fields ) {
            if( err ) callback( new Error( "DBError-Cannot Run Query" ), null );
            if( rows.length >= 1 ) callback( new Error( "USER-User Already Registered" ), null );
            } else {
                db.query( 'INSERT INTO User SET ?', post, function( err, result ) {
                    if( err ) callback( new Error( 'DBError-Cannot Run Query' ), null );
                    else callback( null, newUser );
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