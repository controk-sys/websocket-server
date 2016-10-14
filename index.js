var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io');
var employee = require('./actions/employee');
var client = require('./actions/client');

var pgClient = new require('pg').Client(process.env.DATABASE_URL);

const PORT = typeof(process.env.PORT) != "undefined" ? process.env.PORT : 8888;

io.on("connection", function (socket) {
    socket.on("create employee", function(data) {
        employee.create(pgClient, data);
    });
    socket.on("update employee", function(data) {
        employee.update(pgClient, data);
    });
    socket.on("create client", function(data) {
        client.create(pgClient, data);
    });
    socket.on("update client", function(data) {
        client.update(pgClient, data);
    });
});

http.listen(PORT, function() {
    console.log("Listening at port %s.", PORT);
});