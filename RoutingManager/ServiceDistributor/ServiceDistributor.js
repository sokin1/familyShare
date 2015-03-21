var FormExtractor = require( "./helper/FormExtractor" );

function parseCookies( request ) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach( function( cookie ) {
        var parts = cookie.split( '=' );
        list[parts.shift().trim()] = decodeURI( parts.join( '=' ) );
    });

    return list;
}

function ServiceDistributor( appserver, canvas ) {
    var appServer = appserver;
    var painter = canvas;
    
    var requestData = '';

    this.stylesheetHandler = function( response, pathname ) {
        painter.renderStylesheet( response, pathname );
    }

    this.distribute = function ( request, pathname ) {
        var cookies = parseCookies( request );

        if( pathname ) {

            request.on( 'data', function( data ) {
                requestData += data.toString();
            });

            request.on( 'end', function() {
                if( requestData == '' ) {
                    return ["R1000", null];     // Start
                }

                var extractor = new FormExtractor( requestData );
                var extractedInfo = extractor.extract();

                if( extractedInfo['type'] == 'start' ) {
                    return ["R1000", null];     // Start
                } else if( extractedInfo['type'] == 'signup' ) {
                    return ["R1001", extractedInfo['values']];
                } else if( extractedInfo['type'] == 'login' ) {
                    return ["R1002", extractedInfo['values']];
                } else if( extractedInfo['type'] == 'setup' ) {
                    return ["R1003", extractedInfo['values']];
                }
            });
        } else {
            painter.renderMain( response );
        }
    }
}

exports.distribute = distribute;
