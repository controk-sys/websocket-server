// Check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

var should = require("should"),
    io = require("socket.io-client");

var socketURL = "http://0.0.0.0:" + (process.env.PORT || "8080");
console.log(socketURL);

var options = {
    transports: ["websocket"],
    "force new connection": true
};

describe("Client", () => {
    it("should be registered successfully", function (done) {
        var socket = io.connect(socketURL, options);

        var data = {
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

        socket.emit("create client", data);
        socket.on("create ok", function (message) {
            message.should.equal("Client successfully created.");
            done();
        })
    });
});