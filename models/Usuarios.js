const sequelize = require('../config/db');//db config
const { DataTypes } = require('sequelize');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');


const Usuarios = sequelize.define('usuarios', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Email no puede ir vacio'
            },
            isEmail:{
                msg: 'Agrega un correo valido'
            }
        },
        unique:{
            args: true,
            msg:'Usuario ya registrado'
        }
    },
    password:{
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'Password no puede ir vacio'
            }
        }
    }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})
Usuarios.hasMany(Proyectos);//un usuario puede tener multiples proyectos

module.exports = Usuarios;