// Check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

var databaseURL = process.env.DATABASE_URL || "",
    port = process.env.PORT || "8080";

var app = require("express")(),
    http = require("http").Server(app),
    io = require("socket.io"),
    sequelize = new (require("sequelize"))(databaseURL, {dialect: "postgres"});

io = io(http);

var Client = require("./controllers/clients")(sequelize),
    Employee = require("./controllers/employees")(sequelize),
    Supplier = require("./controllers/suppliers")(sequelize);

io.on("connection", function (socket) {
    // Client
    socket.on("create client", function(data) {
        Client.create(data, socket);
    });
    socket.on("update client", function(data) {
        Client.update(data, socket);
    });
    // Employee
    socket.on("update employee", function(data) {
        Employee.update(data, socket);
    });
    // Supplier
    socket.on("update supplier", function(data) {
        Supplier.update(data, socket);
    });
});

app.get("/", function(request, response) {
    response.send("<h1>Controk WebSocket. :)</h1>");
});

http.listen(port, "0.0.0.0", function() {
    console.log("WebSocket started.");
});
