// Check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

var databaseURL = process.env.DATABASE_URL || "";

var should = require("should"),
    io = require("socket.io-client"),
    socketURL = "http://0.0.0.0:" + (process.env.PORT || "8080"),
    Client = new (require("sequelize"))(databaseURL, {dialect: "postgres"}).import("../models/Client");

var options = {
    transports: ["websocket"],
    "force new connection": true
};

describe("Client", () => {
    var socket = io.connect(socketURL, options),
        data = {
            email: "client@email.com",
            mobile: "(085) 9 9999-9999",
            phone: "(085) 3542-3214",
            cpf: "123.456.789-12",
            name: "Client name",
            observation: "Client observation",
            address: {
                place: 1,
                place_name: "Street name",
                number: 123,
                complement: "Additional info",
                neighborhood: "Neighborhood name",
                city: "City name",
                state: "State name",
                cep: "12345-678"
            }
        };

    it("should be registered successfully", function (done) {
        socket.on("create ok", function (message) {
            message.should.equal("Client successfully created.");
            done();
        });
        socket.emit("create client", data);
    });

    it("should be updated successfully", function (done) {
        socket.on("update ok", function (message) {
            message.should.equal("Client successfully updated.");
            done();
        });

        Client.findOne().then(function (clientInstance) {
            data.id = clientInstance.id;
            data.email = "client@otheremail.com";
            clientInstance.email.should.not.equal(data.email); // Assure that the emails are different
            socket.emit("update client", data);
        });
    });

    it("should be deleted successfully", function (done) {
        socket.on("delete ok", function (message) {
            message.should.equal("Client successfully deleted.");
            done();
        });

        Client.findOne().then(function (clientInstance) {
            socket.emit("delete client", clientInstance.id);
        });
    })
});