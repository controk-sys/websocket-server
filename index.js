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

var Client = require("./controllers/clients")(sequelize);

io.on("connection", function (socket) {
    // Client
    socket.on("update client", function(data) {
        Client.update(data, socket);
    });
});

app.get("/", function(request, response) {
    response.send("<h1>Controk WebSocket Server. :)</h1>");
});

http.listen(port, function() {
    console.log("Listening at port %s.", port);
});
