'use strict'

const express = require('express');

const ActivityController = require('../controllers/Activity.controller');
const ValidateAuthenticated = require('../middleware/EnsureAuthenticated.middleware');

const api = express.Router();

api.post('/activity',
    ValidateAuthenticated.ensureAuthenticated,
    ActivityController.saveActivity);
api.get('/activities',
    ValidateAuthenticated.ensureAuthenticated,
    ActivityController.getAllActivity);
api.get('/activity/:id',
    ValidateAuthenticated.ensureAuthenticated,
    ActivityController.getActivity);
api.put('/activity/:id',
    ValidateAuthenticated.ensureAuthenticated,
    ActivityController.updateActivity
)

module.exports = api

