/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
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
    role: {
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
    tableName: 'Employee',
    timestamps: false
  });
};
