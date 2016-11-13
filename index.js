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
    Product = require("./controllers/products")(sequelize),
    Supplier = require("./controllers/suppliers")(sequelize);

io.on("connection", function (socket) {
    // Client
    socket.on("create client", function(data) {
        Client.create(data, socket);
    });
    socket.on("delete client", function(data) {
        Client.delete(data, socket);
    });
    socket.on("update client", function(data) {
        Client.update(data, socket);
    });
    // Employee
    socket.on("create employee", function(data) {
        Employee.create(data, socket);
    });
    socket.on("delete employee", function(data) {
        Employee.delete(data, socket);
    });
    socket.on("update employee", function(data) {
        Employee.update(data, socket);
    });
    // Product
    socket.on("create product", function(data) {
        Product.create(data, socket);
    });
    socket.on("update product", function(data) {
        Product.update(data, socket);
    });
    // Supplier
    socket.on("create supplier", function(data) {
        Supplier.create(data, socket);
    });
    socket.on("delete supplier", function(data) {
        Supplier.delete(data, socket);
    });
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

// Can't think on anything better, right now, so the tests will run this way
if (process.argv.indexOf("test") >= 0) {
    var test = require("child_process").spawn("mocha", ["-R", "spec", "test/**/*"]);

    // The database will be handled by Django, so this sync is only for tests purposes.
    sequelize.sync().then(
        () => { console.log("Sync database performed successfully.") },
        (error) => { console.log(`Sync database failed: ${error}`); }
    );

    test.stdout.on("data", (data) => {
        if (/(\d+ms)/.test(data)) {
            console.log(data.toString());
        }
    });

    test.stderr.on("data", (data) => {
        console.log(data.toString());
    });

    test.on("close", process.exit);
}