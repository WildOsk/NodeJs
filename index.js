//import express from 'express':
//const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const path = require('path');
const sequelize = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//IMPORTAR MODELOS
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//helpers con algunas funciones
const helpers = require('./helpers');



const PORT = process.env.PORT || 3000;
//crear una app de express
const app = express();

//HABILITAR bodyParser para leer datos de formulario bodyParser is deprecated
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

//donde cargar los archivos estaticos
app.use(express.static('public'));


//habilitar pug
app.set('view engine', 'pug');

//añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//agregar flash messages
app.use(flash());

//sessiones nos permiten navegar entre distintas paginas sin volernos
//a auntenticar
app.use(session({
  secret: 'supersecreto',
  resave: false,
  saveUninitialized: false
}));

app.use(cookieParser());

//pasar vardump a la aplicacion
app.use((req, res, next)=>{
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
})

//ruta para el home
app.use('/', routes() );


app.listen(PORT, async () =>{//puerto en el que quieres lanzar el server
    console.log(`La app ha arrancado en el http://localhost:${PORT}`);

    //conectar a la BBDD
    try {
      //sync({ force: true }) force true es para restablecer la BBDD cuando se resetee el server y elimine los datos
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});
