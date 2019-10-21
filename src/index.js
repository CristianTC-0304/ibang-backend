'use strict';

// Cargamos el el módulo de mongoose para conectarnos a mongoDB
var mongoose = require('mongoose');

// Le indicamos a mongoose que haremos la conexión por promesas
mongoose.Promise = global.Promise;

// Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

// Creamos el puerto por el que va a funcionar el servidor
var PORT = 3000;


mongoose.connect('mongodb://localhost:27017/ibang', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection success mongo');
        app.listen(PORT, () => {
            console.log('el servidor esta corriendo en el localhost:3000');
        })
    })
    .catch(err => console.log('error connection database', err));