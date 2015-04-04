var Error = function( errorType ) {
    var errorList = {
        // Login 1xxx
        "NoUserFound" : 1000,
        "DBError_LogIn" : 1001,
        "FormNotCompleted_LogIn" : 1002,
        // Signup 2xxx
        "MismatchedPassword" : 2000,
        "ExistingEmailAddress" : 2001,
        "FormNotCompleted_LogIn" : 2002,
        "DBError_Signup" : 2003,
        // MainPage 3xxx
        "InvalidGroup" : 3000,
        "PostIncompleted" : 3001,
        "DBError_Post" : 3002,
        // General
        "PageNotFound" : 9000,
    };
    
    var errorNo = errorList[errorType];
    // errorType List
    // 1000 = MismatchedPassword
    // 1001 = ExistingEmailAddress
    // 2000 = 404 Page Not Found

    this.getErrorNo = function() {
        return errorNo;
    }
}

module.exports = Error;