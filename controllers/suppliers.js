module.exports = function (sequelize) {
    var Supplier = sequelize.import("../models/Supplier"),
        Address = sequelize.import("../models/Address");
    return {
        /**
         * @param {{
         * trading_name, email, mobile, phone, cnpj, address_id,
         * address: {place, place_name, number, complement, neighborhood, city, state, cep}
         * }} supplierData
         * @param socket
         */
        create: function (supplierData, socket) {
            Address.create(supplierData.address).then(
                /**
                 * @param {{ id }} address
                 */
                function (address) {
                    delete supplierData.address;
                    supplierData.address_id = address.id;

                    Supplier.create(supplierData).then(function () {
                        socket.emit("create ok", "Supplier successfully created.");
                    }).catch(function (err) {
                        socket.emit("create failed", err.message);
                    });
                }
            ).catch(function (err) {
                socket.emit("create failed", err.message);
            });
        },
        /**
         * @param {{
         * id, trading_name, email, mobile, phone, cnpj,
         * address: {id, place, place_name, number, complement, neighborhood, city, state, cep}
         * }} supplierData
         * @param socket
         */
        update: function (supplierData, socket) {
            Supplier // Get the supplier
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
                                }).catch(function (err) {
                                    socket.emit("update failed", err.message);
                                });
                            }).catch(function (err) {
                                socket.emit("update failed", err.message);
                            });
                        });
                });
        }
    }
};