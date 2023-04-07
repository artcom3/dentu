var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Agenda = require('../models/agenda');

router.get('/', (req, res, next) => {
    Agenda.find()
        .exec(function (err, agendas) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            return res.status(200).json({
                message: 'agendas fetched successfuly',
                agendas: agendas
            })
        });
});

router.post('/', (req, res, next) => {
    const maxAgendaId = sequenceGenerator.nextId("agenda");

    console.log(maxAgendaId);

    const agenda = new Agenda({
        id: maxAgendaId,
        patient: req.body.patient,
        time: req.body.time,
        hour: req.body.hour,
        date: req.body.date,
        treatment: req.body.treatment,
        notes: req.body.notes,
    });

    console.log(agenda);

    agenda.save()
        .then(createdAgenda => {
            res.status(201).json({
                message: 'Agenda added successfully',
                agenda: createdAgenda
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Agenda.findOne({ id: req.params.id })
        .then(agenda => {

            agenda.patient = req.body.patient;
            agenda.time = req.body.time;
            agenda.hour = req.body.hour;
            agenda.date = req.body.date;
            agenda.treatment = req.body.treatment;
            agenda.notes = req.body.notes;

            Agenda.updateOne({ id: req.params.id }, agenda)
                .then(result => {
                    console.log('success')
                    res.status(204).json({
                        message: 'Agenda updated successfully'
                    })
                })
                .catch(error => {
                    console.log('error')
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Agenda not found.',
                error: { agenda: 'Agenda not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Agenda.findOne({ id: req.params.id })
        .then(agenda => {
            Agenda.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Agenda deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Agenda not found.',
                error: { agenda: 'Agenda not found' }
            });
        });
});

module.exports = router; 