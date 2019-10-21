'use strict'

const Activity = require('../models/Activity.model');

function saveActivity(req, res) {
    const activityName = req.body.name;

    if (activityName) {
        Activity.create({ userId: req.user._id, name: activityName }, (err, activityStorage) => {
            if (err) return res.status(500).send({ message: 'Error en el servidor' });

            if (activityStorage) {
                return res.status(200).send({ data: activityStorage })
            } else {
                return res.status(404).send({ message: 'No se ha guardado la actividad' });
            }
        })
    } else {
        return res.status(404).send({ message: 'El nombre de la actividad es obligatorio' })
    }
}

function getAllActivity(req, res) {
    console.log('req user', req.user)
    const userId = req.user._id;
    Activity.find({ userId: userId }).sort({ '_id': -1 }).exec((err, activities) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        if (activities) {
            return res.status(200).send({ data: activities });
        } else {
            return res.status(404).send({ message: 'No hay actividades' });
        }
    });
}

function getActivity(req, res) {
    const activityId = req.params.id;
    Activity.findOne({ userId: req.user._id, _id: activityId }, (err, activity) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        if (activity) {
            return res.status(200).send({ data: activity });
        } else {
            return res.status(404).send({ message: 'No existe esta actividad' });
        }
    })
}

function updateActivity(req, res) {
    const activityId = req.params.id;
    const update = req.body;
    Activity.findOneAndUpdate({ userId: req.user._id, _id: activityId }, update, { new: true }, (err, activityUpdate) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' });

        if (activityUpdate) {
            return res.status(200).send({ data: activityUpdate });
        } else {
            return res.status(404).send({ message: 'No se ha actualizado la actividad' });
        }
    })
}

module.exports = {
    saveActivity,
    getAllActivity,
    getActivity,
    updateActivity
}