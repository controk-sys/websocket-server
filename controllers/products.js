module.exports = function (sequelize) {
    var Product = sequelize.import("../models/Product");
    return {
        /**
         * @param {{description, cost, name, sell_value}} productData
         * @param socket
         */
        create: function (productData, socket) {
            Product.create(productData).then(function () {
                socket.emit("create ok", "Product successfully created.");
            }).catch(function (err) {
                socket.emit("create failed", err.message);
            });
        },
        /**
         * @param {{id, description, cost, name, sell_value}} productData
         * @param socket
         */
        update: function (productData, socket) {
            Product // Get the product
                .findOne({
                    where: {id: productData.id}
                })
                .then(function (product) {
                    // Updates the product
                    product.update(productData).then(function() {
                        socket.emit("update ok", "Product successfully updated.");
                    }).catch(function (err) {
                        socket.emit("update failed", err.message);
                    });
                });
        }
    }
};