const Proyectos = require('../models/Proyectos');


exports.proyectosHome = async (req, res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();
    //Enviar a la consola lo que el usuario envia
    console.log(req.body)

    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({'texto':'Agrega un nombre al proyecto'});
    }

    //si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }
    else{
        //No hay errores
        //Insertar en la BD
        const proyecto = await Proyectos.create({nombre});
        res.redirect('/');

    }
}

exports.proyectoUrl = async(req, res, next) =>{
    const proyectos = await Proyectos.findAll();
    const proyecto = Proyectos.findOne({
        where:{
            url: req.params.url
        }    
    });
    if(!proyecto) return next();
    console.log(proyecto);
    //render a la vista
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    })
    res.send('OK');
}