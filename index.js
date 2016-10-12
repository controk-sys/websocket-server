var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io');

const PORT = typeof(process.env.PORT) != "undefined" ? process.env.PORT : 8888;

http.listen(PORT, function() {
    console.log("Listening at port %s.", PORT);
});