function parseCookies( request ) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach( function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

function route( pathname, response, request, app_server, distributor, canvas ) {
    console.log( "About to route a request for " + pathname );
    if( pathname.indexOf( ".css" ) != -1 ) {
        // TODO: call canvas function directly not via app_server
        app_server.stylesheet( response, pathname, canvas );
    }

    var cookie = parseCookies( request );
    distributor.distribute( request, pathname, cookie );
}

exports.route = route;
