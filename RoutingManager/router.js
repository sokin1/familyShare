function route( pathname, response, request, distributor ) {
    console.log( "About to route a request for " + pathname );
    if( pathname.indexOf( ".css" ) != -1 ) {
    	distributor.stylesheetHandler( response, pathname );
    } else {
	    distributor.distribute( response, request, pathname );
	}
}

exports.route = route;