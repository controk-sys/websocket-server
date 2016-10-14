module.exports = {
    create: function (dbClient, client_data) {
        dbClient.connect();
        var queryStmt = "insert into Client (address, contact, cpf, name, observation) values ";

        for(var i = 0; i < client_data.length; i++) {
            if (i != 0) queryStmt += ",";
            queryStmt += "(" +
                client_data.address + ", " +
                client_data.cpf + ", " +
                client_data.name + ", " +
                client_data.observation +
                ")";
        }

        dbClient.query(queryStmt);
    },
    update: function (dbClient, client_data) {
        dbClient.connect();
        dbClient.query(
            "update Client set " +
            "address = $1, contact = $2, cpf = $3, name = $4, observation = $5 " +
            "where id = $6",
            [
                client_data.address,
                client_data.contact,
                client_data.cpf,
                client_data.name,
                client_data.observation,
                client_data.id
            ]
        );
    }
};