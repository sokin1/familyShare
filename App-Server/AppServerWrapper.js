var RequestHandler = require( "./RequestHandler" );
var GroupManager = require( "./GroupManager" );
var PostManager = require( "./PostManager" );
var DBManager = require( "./DBManager" );
var FileManager = require( "./FileManager" );
var UserManager = require( "./UserManager" );

function AppServerWrapper() {
    var requestHandler = new RequestHandler();
    var groupManager = new GroupManager();
    var postManager = new PostManager();
    var DBManager = new DBManager();
    var fileManager = new FileManager();
    var userManager = new UserManager();

    function stylesheet( response, pathname, canvas ) {
        canvas.renderStylesheet( response, pathname );
    }
}

exports.AppServerWrapper = AppServerWrapper;
