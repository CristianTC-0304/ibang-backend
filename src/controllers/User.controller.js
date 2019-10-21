'use strict'

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User.model');


function register(req, res) {
    User.findOne({ email: req.body.email }).exec((err, userStorage) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        if (userStorage) {
            return res.status(404).send({ message: 'Este usuario ya existe' });
        } else {
            const hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            user.save((err, userStorage) => {
                if (err) return res.status(500).send({ message: 'Error en el servidor' })
                if (userStorage) {
                    return res.status(200).send({ data: userStorage })
                } else {
                    return res.status(404).send({ message: 'No se ha guardado el usuario' })
                }
            });
        }
    });
}

function login(req, res) {
    const params = req.body;
    const username = params.username;
    const email = params.email;
    const password = params.password;

    if (params.email) {
        User.findOne({ email: email }).exec((err, userStorage) => {
            if (err) return res.status(500).send({ message: 'Error en el servidor' });
            if (userStorage === null || !bcrypt.compareSync(password, userStorage.password)) {
                return res.status(404).send({ message: "Nombre de usuario o contraseña incorrectos" });
            } else {
                const payload = {
                    sub: userStorage._id,
                    exp: Math.round(Date.now() / 100) + parseInt(process.env.JWT_LIFETIME),
                    username: userStorage.username,
                    email: userStorage.email
                };
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {
                    algorithm: process.env.JWT_ALGORITHM
                });

                return res.status(200).send({ data: { token: token } })
            }
        })
    } else {
        return res.status(404).send({ message: 'El nombre de usuario es obligatorio' })
    }
}

module.exports = {
    register,
    login
}