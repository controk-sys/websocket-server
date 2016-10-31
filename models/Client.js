/* jshint indent: 4 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Client", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observation: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Address",
                key: "id"
            }
        }
    }, {
        tableName: "Client",
        timestamps: false
    });
};
