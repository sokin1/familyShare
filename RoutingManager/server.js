var http = require( "http" );
var url = require( "url" );
var AppServerWrapper = require( "/App-Server/AppServerWrapper" );
var ServiceDistributor = require( "./ServiceDistributor/ServiceDistributor" );
var Canvas = require( "/Canvas/Canvas" );

function start( route ) {
    var app_server = new AppServerWrapper();
    var canvas = new Canvas();
    var distributor = new ServiceDistributor( app_server, canvas );

    function onRequest( request, response ) {
        var pathname = url.parse( request.url ).pathname;
        console.log( "Request for " + pathname + " received." );

        route( pathname, response, request, distributor );
    }

    http.createServer( onRequest ).listen( 8888 );
    console.log( "Server has started." );
}

exports.start = start;
