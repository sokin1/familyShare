var FormExtractor = require( "../../helper/FormExtractor" );
var CookieParser = require( "../../helper/CookieParser" );
var Services = require( "./Services.js" );
var UserManager = require( "../../App-Server/UserManager" );

function ServiceDistributor( appserver, canvas ) {
    var appServer = appserver;
    var painter = canvas;

    var requestData = '';

    this.stylesheetHandler = function( response, pathname ) {
        painter.renderStylesheet( response, pathname );
    }

    this.distribute = function ( response, request, pathname ) {
        // TODO : Design decision : Getting cookie here? or in each services.
        // How to create and use global class for global functions.
        var cookieParser = new CookieParser();
        var cookies = cookieParser.parseCookies( request );
        var req = new Request();

        if( pathname != "/" ) painter.renderUnknownPage( response );
        else {
            // TODO : Replace this outer if-clause. IT ISN'T COOL!
            if( cookies == null ) {
                request.on( 'data', function( data ) {
                    requestData += data.toString();
                });

                request.on( 'end', function() {
                    var extractor = new FormExtractor();
                    // TODO : GOTTA FIX IT SINCE IT USES Request object
                    var extractedInfo = extractor.extract( req, requestData );
                    var rtn = null;

                    if( req.REQ_TYPE == 'USR_START' ) {
                    } else if( req.REQ_TYPE == 'USR_LOGIN' ) {
                        appServer.userManager.serviceDispatcher( req, appServer, function( err, ugp ) {
                            if( err ) rtn = err;
                            else rtn = ugp;

                            painter.dispatchRenderer( response, rtn );
                        });
                    } else if( req.REQ_TYPE == 'USR_SIGNUP' ) {
                        appServer.userManager.serviceDispatcher( req, appServer, function( err, ugp ) {
                            if( err ) rtn = err;
                            else rtn = ugp;

                            painter.dispatchRenderer( response, rtn );
                        });
                    }
                });
            } else {
                // DESC : This is the big picture of the application distributor.
                // It doesn't need to know which service is launched,
                // and just do the service and return the retVal to paint the result.

                // DESC : Cookies should contain minimum amount of information,
                //      NO PASSWORD, NO DETAIL INFORMATION
                //      Only contains status and few flag information.
                // And Cookies should be set in one of the painter functions before rendering.
                // DESIGN DECISION : cookie-related job should be done in one of the painter.
                //                   to prevent disperse cookie-related functions.
                //                   and collect cookie-related functions in painter functions.
                var ugpGroup = cookieParser.retrieveInfoFromCookies( cookies );
                // TODO : Need distributor for renderers depends on what ugpGroup contains.
                painter.dispatchRenderer( response, ugpGroup );    
            }
        }
    }
}

module.exports = ServiceDistributor;