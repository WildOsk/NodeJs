const { DataTypes  } = require('sequelize');
const sequelize = require('../config/db');

const Proyectos = sequelize.define('proyectos', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre: {type: DataTypes.STRING},

  url: {type: DataTypes.STRING}

}, {
  // Other model options go here
});

module.exports = Proyectos;
// `sequelize.define` also returns the model
console.log(Proyectos === sequelize.models.Proyectos); // true