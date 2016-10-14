module.exports = {
    create: function (dbClient, employee_data) {
        dbClient.connect();
        var queryStmt = "insert into Employee (address, contact, cpf, role, name, observation) values ";

        for(var i = 0; i < employee_data.length; i++) {
            if (i != 0) queryStmt += ",";
            queryStmt += "(" +
                employee_data.address + ", " +
                employee_data.cpf + ", " +
                employee_data.role + ", " +
                employee_data.name + ", " +
                employee_data.observation +
                ")";
        }

        dbClient.query(queryStmt);
    },
    update: function (dbClient, employee_data) {
        dbClient.connect();
        dbClient.query(
            "update Employee set " +
            "address = $1, contact = $2, cpf = $3, role = $4, name = $5, observation = $6 " +
            "where id = $7",
            [
                employee_data.address,
                employee_data.contact,
                employee_data.cpf,
                employee_data.role,
                employee_data.name,
                employee_data.observation,
                employee_data.id
            ]
        );
    }
};