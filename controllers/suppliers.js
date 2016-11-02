module.exports = function (sequelize) {
    var Client = sequelize.import("../models/Supplier"),
        Address = sequelize.import("../models/Address");
    return {
        /**
         * @param {{
         * id, trading_name, email, mobile, phone, cnpj,
         * address: {id, place, place_name, number, complement, neighborhood, city, state, cep}
         * }} supplierData
         * @param socket
         */
        update: function (supplierData, socket) {
            Client // Get the supplier
                .findOne({
                    where: {id: supplierData.id}
                })
                .then(function (supplierInstance) {
                    Address // Get the address
                        .findOne({
                            where: {id: supplierInstance.address_id}
                        })
                        .then(function(addressInstance) {
                            // Updates the address
                            addressInstance.update(supplierData.address).then(function() {
                                delete supplierData.address;
                                // Updates the supplier
                                supplierInstance.update(supplierData).then(function() {
                                    socket.emit("update ok", "Supplier successfully updated.");
                                });
                            });
                        });
                });
        }
    }
};