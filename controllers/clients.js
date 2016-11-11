module.exports = function (sequelize) {
    var Client = sequelize.import("../models/Client"),
        Address = sequelize.import("../models/Address");
    return {
        /**
         * @param {{
         * name, email, mobile, phone, cpf, observation, address_id,
         * address: {place, place_name, number, complement, neighborhood, city, state, cep}
         * }} clientData
         * @param socket
         */
        create: function (clientData, socket) {
            Address.create(clientData.address).then(
                /**
                 * @param {{ id }} address
                 */
                function (address) {
                    delete clientData.address;
                    clientData.address_id = address.id;

                    Client.create(clientData).then(function () {
                        socket.emit("create ok", "Client successfully updated.");
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
         * id, name, email, mobile, phone, cpf, observation,
         * address: {id, place, place_name, number, complement, neighborhood, city, state, cep}
         * }} clientData
         * @param socket
         */
        update: function (clientData, socket) {
            Client // Get the client
                .findOne({
                    where: {id: clientData.id}
                })
                .then(function (clientInstance) {
                    Address // Get the address
                        .findOne({
                            where: {id: clientInstance.address_id}
                        })
                        .then(function(addressInstance) {
                            // Updates the address
                            addressInstance.update(clientData.address).then(function() {
                                delete clientData.address;
                                // Updates the client
                                clientInstance.update(clientData).then(function() {
                                    socket.emit("update ok", "Client successfully updated.");
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