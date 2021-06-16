const { DataTypes  } = require('sequelize');
const sequelize = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

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
  hooks:{
    beforeCreate(proyecto){
      const url = slug(proyecto.nombre).toLowerCase();

      proyecto.url = `${url}-${shortid.generate()}`;
    }
  }
});

module.exports = Proyectos;
// `sequelize.define` also returns the model
console.log(Proyectos === sequelize.models.Proyectos); // true