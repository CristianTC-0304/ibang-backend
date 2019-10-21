'use strict'

const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return next(res.status(403).send({ message: "Falta el encabezado de autorización" }))
    }
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, { algorithms: [process.env.JWT_ALGORITHM] }, (err, payload) => {
        if (err) {
            return next(res.status(401).send({ message: err.message }));
        } else {
            User.findOne({ _id: payload.sub }).exec((err, res) => {
                if (err) return res.status(500).send({ err: err })
                if (res) {
                    if (res === null) {
                        return next(res.status(403).send({ message: "No tienes permisos de acceso" }));
                    } else {
                        req.user = res
                        return next()
                    }
                }
            })
        }
    })
}

module.exports = {
    ensureAuthenticated
} 