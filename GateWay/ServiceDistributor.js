function ServiceDistributor( reqeustHandler ) {
    var handler = requestHandler;
    this.distribute = function( pathname ) {
        if( pathname == '/main' ) {
            handler.main();
        } else {
            ...
        }
    }

    this.rtnToCanvas = function( ... ) {
        canvas.renderer();
    }
}

module.exports = ServiceDistributor;
