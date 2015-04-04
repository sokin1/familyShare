//var RequestHandler = require( "./RequestHandlers" );
var GroupManager = require( "./GroupManager" );
var PostManager = require( "./PostManager" );
var DBManager = require( "../DataDirector/DBManager" );
var FileManager = require( "../DataDirector/FileManager" );
var UserManager = require( "./UserManager" );

function AppServerWrapper() {
//    var requestHandler = new RequestHandler();
    this.groupManager = new GroupManager();
    this.postManager = new PostManager();
    this.dbManager = new DBManager();
    this.fileManager = new FileManager();
    this.userManager = new UserManager();
}

module.exports = AppServerWrapper;
