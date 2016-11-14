/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Supplier', {
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
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trading_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Address',
        key: 'id'
      }
    }
  }, {
    tableName: 'Supplier',
    timestamps: false
  });
};
