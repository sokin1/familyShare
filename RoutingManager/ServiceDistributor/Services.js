var UserManager = require( "../../App-Server/UserManager.js")
// List of services..
// * Added to the list when new service is implemented.
// * Removed from the list when new service is eliminated.
// * Locate request to the right service locations.

// * User related requests are placed in userManager.
// * Group related reqeusts are placed in groupManager.

Services = {};
Services['/'] = UserManager.serviceDispatcher;
Services['signup'] = UserManager.serviceDispatcher;
Services['login'] = UserManager.serviceDispatcher;

module.exports = Services;