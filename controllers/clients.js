

module.exports = function (sequelize) {
    var Client = sequelize.import("../models/Client"),
        Address = sequelize.import("../models/Address");
    return {
        /**
         * @param {{
         * id, name, email, mobile, phone, cpf, name, observation,
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
                                    socket.emit("client updated", "Client successfully updated.");
                                });
                            });
                        });
                });
        }
    }
};