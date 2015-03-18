var FormExtractor = require( "./helper/FormExtractor" );

function ServiceDistributor( appserver ) {
    var appServer = appserver;
    
    var requestData = '';

    this.distribute = function ( request, pathname, cookie ) {
        // TODO : Why do I need "cookie" here?
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
    }
}
