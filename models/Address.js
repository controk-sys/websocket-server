/* jshint indent: 4 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Address", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        place: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        place_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        complement: {
            type: DataTypes.STRING,
            allowNull: true
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "Address",
        timestamps: false
    });
};
