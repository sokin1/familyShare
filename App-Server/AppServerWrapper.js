var RequestHandler = require( "./RequestHandler" );
var GroupManager = require( "./RequestHandler" );
var PostManager = require( "./PostManager" );
var DBManager = require( "./DBManager" );
var FileManager = require( "./FileManager" );
var Authenticator = require( "./Authenticator" );
var Canvas = require( "./Canvas" );

function AppServerWrapper() {
    var requestHandler = new RequestHandler();
    var groupManager = new GroupManager();
    var postManager = new PostManager();
    var DBManager = new DBManager();
    var fileManager = new FileManager();
    var authenticator = new Authenticator( DBManager );
    var canvas = new Canvas();

    function stylesheet( response, pathname, canvas ) {
        canvas.renderStylesheet( response, pathname );
    }
}

exports.AppServerWrapper = AppServerWrapper;