var server = require( "./RoutingManager/server" );
var router = require( "./RoutingManager/router" );

server.start( router.route );
