// Synchronously check if ".env" exists before import
if (require("fs").existsSync(".env")) require("dotenv").config();

var databaseURL = process.env.DATABASE_URL || "",
    port = process.env.PORT || "8080";

var pgClient = new (require('pg').Client)(databaseURL), // Shortened due to its specific need
    http = require('http').Server(require('express')()),
    io = require('socket.io')(http);

var employee = require('./js/employee'),
    client = require('./js/client');

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

http.listen(port, function() {
    console.log("Listening at port %s.", port);
});
