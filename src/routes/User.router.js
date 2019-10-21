'use strict'

const express = require('express');

const UserContoller = require('../controllers/User.controller');

const api = express.Router();

api.post('/login', UserContoller.login);
api.post('/register', UserContoller.register);

module.exports = api;