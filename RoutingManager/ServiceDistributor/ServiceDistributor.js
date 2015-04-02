var FormExtractor = require( "/helper/FormExtractor" );
var CookieParser = require( "/helper/CookieParser" );
var Services = require( "./Services.js" );

function ServiceDistributor( appserver, canvas ) {
    var appServer = appserver;
    var painter = canvas;

    var requestData = '';

    this.stylesheetHandler = function( response, pathname ) {
        painter.renderStylesheet( response, pathname );
    }

    this.distribute = function ( response, request, pathname ) {
        // TODO : Design decision : Getting cookie here? or in each services.
        var cookies = parseCookies( request );

        // TODO : Eliminate the use of pathname, use cookie and request parameters instead.
        if( Services[pathname] != null ) {
            Services[pathname]( request, pathname, appserver, function( retVal ) {
                // DESC : This is the big picture of the application distributor.
                // It doesn't need to know which service is launched,
                // and just do the service and return the retVal to paint the result.
                painter.renderPage( response, retVal );
            });
        } else {
            painter.renderUnknownPage( response );
        }
    }
}

exports.distribute = distribute;