/* jshint indent: 4 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cost: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sell_value: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 'Product',
        timestamps: false
    });
};
