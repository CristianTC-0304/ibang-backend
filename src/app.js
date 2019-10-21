'use strict';

// Cargamo modulos de express y bosy-parser
const express = require('express');
const bodyParse = require('body-parser');

// Llamamos a express para poder crear el servidor
const app = express();

// Cargamos la configuración de las rutas
const userRouter = require('./routes/User.router')
const activityRouter = require('./routes/Activity.router');

// Configuramos bosy-parser para convertir el body de nuestra peticiones a un JSON
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json());

// Aquí configuramos el CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


// Aquí configuramos las rutas
app.get('/mi-prueba', (req, res) => {
    return res.status(200).send({
        messsage: 'Metodo de pruebas del Api Rest'
    });
})

app.use('/api',
    userRouter,
    activityRouter
);

// Exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;

