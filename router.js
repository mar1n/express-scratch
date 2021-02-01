var setPrototypeOf = require('setprototypeof');

var proto = module.exports = function(options) {
    var opts = options || {}

    function router(req, res, next) {
        router.handle(req, res, next)
    }

    setPrototypeOf(router, proto)

    /* express specific, we will go through them in later chapters */
    router.params = {};
    router._params = [];
    router.caseSensitive = opts.caseSensitive;
    router.mergeParams = opts.mergeParams;
    router.strict = opts.strict;
    router.stack = []; //really important property

    return router;
}

proto.route = function route(path) {
    var route = new Route(path);

    var layer = new Layer(path, {}, route.dispatch.bind(route));

    layer.route = route;

    this.stack.push(layer);

    return route;
}