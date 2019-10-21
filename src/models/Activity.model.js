'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ActivitySchema = new Schema({
    userId: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    date: Array,
    hours: Array
})

module.exports = mongoose.model('Activity', ActivitySchema, 'activities')