module.exports = function (sequelize) {
    var Employee = sequelize.import("../models/Employee"),
        Address = sequelize.import("../models/Address");
    return {
        /**
         * @param {{
         * id, name, email, mobile, role, phone, cpf, observation,
         * address: {id, place, place_name, number, complement, neighborhood, city, state, cep}
         * }} employeeData
         * @param socket
         */
        update: function (employeeData, socket) {
            Employee // Get the employee
                .findOne({
                    where: {id: employeeData.id}
                })
                .then(function (employee) {
                    Address // Get the address
                        .findOne({
                            where: {id: employee.address_id}
                        })
                        .then(function(addressInstance) {
                            // Updates the address
                            addressInstance.update(employeeData.address).then(function() {
                                delete employeeData.address;
                                // Updates the client
                                employee.update(employeeData).then(function() {
                                    socket.emit("update ok", "Employee successfully updated.");
                                });
                            });
                        });
                });
        }
    }
};