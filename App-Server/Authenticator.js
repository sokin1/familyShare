var User = require( "./User" );
var Error = require( "./Error" );

function Authenticator( dbManager ) {
    var manager = dbManager;

    var validateInput = function( input ) {
        if( input['ID'] == '' || input['password'] == '' || input['re_typed_password'] == '' ) {
            return new Error( 'FormNotCompleted ' );
        } else if( input['password'] != input['re_typed_password'] ) {
            return new Error( 'MismatchedPassword' );
        } else {
            return null;
        }
    }

    // Currently used when login
    this.authenticate = function( userInfo, callback ) {
        manager.getUserInfo( userInfo, function( err, state ) {
            if( err ) callback( err, null );
            else callback( null, new User( userInfo['ID'], false ) );
        });
    }

    // Make another ways to access dbmanager, not just from authenticator
    // getGroupInfo should be called from other modules.
    this.getGroupInfo = function( user, callback ) {
        if( user instanceof User ) {
            manager.getGroupInfo( user, function( err, group ) {
                if( err ) callback( err, null, null );
                if( group instanceof Group ) {
                    manager.getPosts( state, function( err, posts ) {
                        if( posts instanceof Post ) {
                            callback( null, group, posts );
                        } else {
                            callback( null, group, null );
                        }
                    });
                } else {
                    callback( Error( "NOGROUP" ), null, null );
                }
            });
        } else {
            //Exception
            console.log( "PANIC" );
        }
    }

    this.signupNewUser = function( newUserInfo, callback ) {
        var validated = validateInput( newUserInfo );
        if( validated == null ) {
            manager.setUserInfo( newUserInfo, function( err, state ) {
                if( err ) callback( err, null );
                else callback( null, new User( newUserInfo['ID'], true ) );
            });
        } else {
            callback( null, validated );
        }
    }
}

module.exports = Authenticator;
