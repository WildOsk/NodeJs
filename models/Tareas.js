const sequelize = require('../config/db');//db config
const { DataTypes } = require('sequelize');
const Proyectos = require('./Proyectos');

const Tareas = sequelize.define('tareas', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    tarea: {type: DataTypes.STRING(100)},
    estado: {type: DataTypes.INTEGER(1)}
  
  }, {
    // Other model options go here
  });
  Tareas.belongsTo(Proyectos);//cada tarea pertenece a un proyecto
  //Proyectos.hasMany(Tareas);//Un proyecto puede tener muchas tareas esto iria en el otro modelo


  module.exports = Tareas;