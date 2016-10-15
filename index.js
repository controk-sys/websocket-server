var http = require('http').Server(require('express')());
var io = require('socket.io');
// DATABASE_URL = postgres://{USER}:{PASSWORD}@{HOST}/{DB_NAME}
var pgClient = new (require('pg').Client)(process.env.DATABASE_URI); // Shortened due to specific need
var employee = require('./js/employee');
var client = require('./js/client');

const PORT = typeof(process.env.PORT) != "undefined" ? process.env.PORT : 8888;

io.on("connection", function (socket) {
    // Employee
    socket.on("create employee", function(data) {
        employee.create(pgClient, data);
    });
    socket.on("update employee", function(data) {
        employee.update(pgClient, data);
    });
    socket.on("delete employee", function(data) {
        employee.delete(pgClient, data);
    });

    // Client
    socket.on("create client", function(data) {
        client.create(pgClient, data);
    });
    socket.on("update client", function(data) {
        client.update(pgClient, data);
    });
    socket.on("delete client", function(data) {
        client.delete(pgClient, data);
    });
});

http.listen(PORT, function() {
    console.log("Listening at port %s.", PORT);
});