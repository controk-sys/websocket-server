// Check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

var databaseURL = process.env.DATABASE_URL || "";

var should = require("should"),
    io = require("socket.io-client"),
    socketURL = "http://0.0.0.0:" + (process.env.PORT || "8080"),
    Product = new (require("sequelize"))(databaseURL, {dialect: "postgres"}).import("../models/Product");

var options = {
    transports: ["websocket"],
    "force new connection": true
};

describe("Product", () => {
    var socket = io.connect(socketURL, options),
        data = {
            cost: 9,
            sell_value: 12,
            description: "Product description",
            name: "Product name"
        };

    it("should be registered successfully", function (done) {
        socket.on("create ok", function (message) {
            message.should.equal("Product successfully created.");
            done();
        });
        socket.on("create failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });
        socket.emit("create product", data);
    });

    it("should be updated successfully", function (done) {
        socket.on("update ok", function (message) {
            message.should.equal("Product successfully updated.");
            done();
        });
        socket.on("update failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });

        Product.findOne().then(function (productInstance) {
            data.id = productInstance.id;
            data.description = productInstance.description + "m"; // Just to assure that something will be different
            socket.emit("update product", data);
        });
    });
});