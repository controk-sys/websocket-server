// Check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

var databaseURL = process.env.DATABASE_URL || "";

var should = require("should"),
    io = require("socket.io-client"),
    socketURL = "http://0.0.0.0:" + (process.env.PORT || "8080"),
    Employee = new (require("sequelize"))(databaseURL, {dialect: "postgres"}).import("../models/Employee");

var options = {
    transports: ["websocket"],
    "force new connection": true
};

describe("Employee", () => {
    var socket = io.connect(socketURL, options),
        data = {
            email: "employee@email.com",
            mobile: "(085) 9 9999-9999",
            phone: "(085) 3542-3214",
            cpf: "123.456.789-12",
            role: "A important role",
            name: "Employee name",
            observation: "Employee observation",
            address: {
                place: 2,
                place_name: "Cool avenue name",
                number: 1234,
                complement: "Some additional info",
                neighborhood: "Neighborhood name",
                city: "City name",
                state: "State name",
                cep: "12345-678"
            }
        };

    it("should be registered successfully", function (done) {
        socket.on("create ok", function (message) {
            message.should.equal("Employee successfully created.");
            done();
        });
        socket.on("create failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });
        socket.emit("create employee", data);
    });

    it("should be updated successfully", function (done) {
        socket.on("update ok", function (message) {
            message.should.equal("Employee successfully updated.");
            done();
        });
        socket.on("update failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });

        Employee.findOne().then(function (employeeInstance) {
            data.id = employeeInstance.id;
            data.email = employeeInstance.email + "m"; // Just to assure that something will be different
            socket.emit("update employee", data);
        });
    });

    it("should be deleted successfully", function (done) {
        socket.on("delete ok", function (message) {
            message.should.equal("Employee successfully deleted.");
            done();
        });
        socket.on("delete failed", function (message) {
            message.should.not.be.ok(); // Fail the assertion
            done();
        });

        Employee.findOne().then(function (employeeInstance) {
            socket.emit("delete employee", employeeInstance.id);
        });
    })
});