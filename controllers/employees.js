module.exports = function (sequelize) {
    var Employee = sequelize.import("../models/Employee"),
        Address = sequelize.import("../models/Address");
    return {
        /**
         * @param {{
         * name, email, mobile, phone, cpf, role, observation, address_id,
         * address: {place, place_name, number, complement, neighborhood, city, state, cep}
         * }} employeeData
         * @param socket
         */
        create: function (employeeData, socket) {
            Address.create(employeeData.address).then(
                /**
                 * @param {{ id }} address
                 */
                function (address) {
                    delete employeeData.address;
                    employeeData.address_id = address.id;

                    Employee.create(employeeData).then(function () {
                        socket.emit("create ok", "Employee successfully created.");
                    }).catch(function (err) {
                        socket.emit("create failed", err.errors[0].message);
                    });
                }
            ).catch(function (err) {
                socket.emit("create failed", err.errors[0].message);
            });
        },
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
                                // Updates the employee
                                employee.update(employeeData).then(function() {
                                    socket.emit("update ok", "Employee successfully updated.");
                                }).catch(function (err) {
                                    socket.emit("update failed", err.errors[0].message);
                                });
                            }).catch(function (err) {
                                socket.emit("update failed", err.errors[0].message);
                            });
                        });
                });
        }
    }
};