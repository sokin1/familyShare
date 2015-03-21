function route( pathname, response, request, distributor ) {
    console.log( "About to route a request for " + pathname );
    if( pathname.indexOf( ".css" ) != -1 ) {
        distributor.stylesheetHandler( response, pathname );
    }

    distributor.distribute( request, pathnam );
}

exports.route = route;
