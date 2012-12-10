var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/startProcess"] = requestHandlers.startProcess;
handle["/lightstop"] = requestHandlers.lightstop;
handle["/hardstop"] = requestHandlers.hardstop;

server.start(router.route, handle);