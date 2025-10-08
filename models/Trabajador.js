const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Trabajador = sequelize.define('Trabajador', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  puesto: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = Trabajador;
