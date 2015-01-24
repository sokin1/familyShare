var http = require( "http" );
var url = require( "url" );
var AppServerWrapper = require( "./App-Server/AppServerWrapper" );
var ServiceDistributor = require( "./Service-Distributor/ServiceDistributor" );

function start( route ) {
    var app_server = new AppServerWrapper();
    var distributor = new ServiceDistributor( app_server );

    function onRequest( request, response ) {
        var pathname = url.parse( request.url ).pathname;
        console.log( "Request for " + pathname + " received." );

        route( pathname, response, request, app_server, distributor );
    }

    http.createServer( onRequest ).listen( 8888 );
    console.log( "Server has started." );
}

exports.start = start;
