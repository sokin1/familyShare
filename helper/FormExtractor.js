var FormExtractor = function( stringifiedData ) {
    var input = stringifiedData;

    var signupFormExtractor = function() {
        userId = input.substring( input.indexOf( "\r\n\r\n" )+4, input.indexOf( "\r\n------" ) );

        input = input.substring( input.indexOf( "\r\n------" )+8 );
        password = input.substring( input.indexOf( "\r\n\r\n" )+4, input.indexOf( "\r\n------" ) );

        input = input.substring( input.indexOf( "\r\n------" )+8 );
        re_typed_password = input.substring( input.indexOf( "\r\n\r\n" )+4, input.indexOf( "\r\n------" ) );

        var rtnValue = { "ID" : userId, "password" : password, "re_typed_password" : re_typed_password };

        return rtnValue;
    }

    var loginFormExtractor = function() {
        userId = input.substring( input.indexOf( "\r\n\r\n" )+4, input.indexOf( "\r\n------" ) );

        input = input.substring( input.indexOf( "\r\n------" )+8 );
        password = input.substring( input.indexOf( "\r\n\r\n" )+4, input.indexOf( "\r\n------" ) );

        var rtnValue = { "ID" : userId, "password" : password };

        return rtnValue;
    }

    var postRequestExtractor = function() {
        data_type = input.substring( input.indexOf( "=" )+1, input.indexOf( "&" ) );
        
        input = input.substring( input.indexOf( "&" )+1 );
        username = input.substring( input.indexOf( "=" )+1 );

        var rtnValue = { "type" : data_type, "username" : username };
        return rtnValue;
    }

    this.extract = function() {
        type = input.substring( input.indexOf( "\r\n\r\n" )+4, input.indexOf( "\r\n------" ) );

        input = input.substring( input.indexOf( "\r\n------" )+8 );

        console.log( "TODO : need to be revisited" );
        if( type == 'signup' ) {
            var rtnValue = { 'type' : type, values : signupFormExtractor() };
        } else if( type == 'login' ) {
            var rtnValue = { 'type' : type, values : loginFormExtractor() };
        } else {
            var rtnValue = { 'type' : 'start', values : {} };
        }

        return rtnValue;
    }
}

module.exports = FormExtractor;
