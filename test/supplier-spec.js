// Check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

var databaseURL = process.env.DATABASE_URL || "";

var should = require("should"),
    io = require("socket.io-client"),
    socketURL = "http://0.0.0.0:" + (process.env.PORT || "8080"),
    Supplier = new (require("sequelize"))(databaseURL, {dialect: "postgres"}).import("../models/Supplier");

var options = {
    transports: ["websocket"],
    "force new connection": true
};

describe("Supplier", () => {
    var socket = io.connect(socketURL, options),
        data = {
            email: "supplier@email.com",
            mobile: "(085) 9 9999-9999",
            phone: "(085) 3542-3214",
            cnpj: "12.345.678/0001-12",
            trading_name: "Supplier name",
            address: {
                place: 3,
                place_name: "Short street",
                number: 134,
                complement: "Quite additional info",
                neighborhood: "Good neighborhood",
                city: "City name",
                state: "State name",
                cep: "12335-678"
            }
        };

    it("should be registered successfully", function (done) {
        socket.on("create ok", function (message) {
            message.should.equal("Supplier successfully created.");
            done();
        });
        socket.on("create failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });
        socket.emit("create supplier", data);
    });

    it("should be updated successfully", function (done) {
        socket.on("update ok", function (message) {
            message.should.equal("Supplier successfully updated.");
            done();
        });
        socket.on("update failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });

        Supplier.findOne().then(function (supplierInstance) {
            data.id = supplierInstance.id;
            data.email = supplierInstance.email + "m"; // Just to assure that something will be different
            socket.emit("update supplier", data);
        });
    });

    it("should be deleted successfully", function (done) {
        socket.on("delete ok", function (message) {
            message.should.equal("Supplier successfully deleted.");
            done();
        });
        socket.on("delete failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });

        Supplier.findOne().then(function (supplierInstance) {
            socket.emit("delete supplier", supplierInstance.id);
        });
    });
});