var mysql = require( 'mysql' );
var User = require( "./User" );

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
    });

    this.request = function() {
        
    }

    this.getUserInfo = function( userInfo, callback ) {
        var key1 = userInfo['ID'];
        var key2 = userInfo['password'];

        db.query( 'SELECT * FROM User WHERE userName = ? AND password = ?', [key1, key2], function( err, rows, fields ) {
            if( err ) callback( err, new Error( 'DBERROR-Cannot Run Query' ) );
            else {
                if( rows.length == 1 ) {
                    callback( null, new User( key1, false ) );
                } else if( rows.length == 0 ) {
                    callback( null, new Error( 'No Such User' ) );
                } else {
                    callback( null, new Error( 'DBERROR-Too Many Results' ) );
                }
            }
        });
    }

    this.setUserInfo = function( newUserInfo, callback ) {
        var post = { userName : newUserInfo['ID'], password : newUserInfo['password'] };
        var key = userId;

        db.query( 'SELECT * FROM User WHERE userName = ?', [key], function( err, rows, fields ) {
            if( err ) callback( err, null );
            if( rows.length >= 1 ) {
                callback( null, Error( "Existing User" ) );
            } else {
                db.query( 'INSERT INTO User SET ?', post, function( err, result ) {
                    if( err ) callback( err, null );
                    else callback( null, result );
                });
            }
        });
    }

    this.getGroupInfo = function( user, callback ) {
        
    }

    this.setGroupInfo = function( group ) {
    }
}

exports.DBManager = DBManager;