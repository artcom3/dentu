var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Patient = require('../models/patient');

router.get('/', (req, res, next) => {
    Patient.find()
        .populate('tutor')
        .exec(function (err, patients) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            return res.status(200).json({
                message: 'patients fetched successfuly',
                patients: patients
            })
        });
});

router.post('/', (req, res, next) => {
    const maxPatientId = sequenceGenerator.nextId("patients");

    console.log(req.body)

    const patient = new Patient({
        id: maxPatientId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        dni: req.body.dni,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        nationality: req.body.nationality,
        educationDegree: req.body.educationDegree,
        tutor: req.body.tutor,
    });

    console.log(patient);

    patient.save()
        .then(createdPatient => {
            res.status(201).json({
                message: 'Patient added successfully',
                patient: createdPatient
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
    Patient.findOne({ id: req.params.id })
        .then(patient => {
            patient.firstName = req.body.firstName;
            patient.lastName = req.body.lastName;
            patient.dateOfBirth = req.body.dateOfBirth;
            patient.gender = req.body.gender;
            patient.dni = req.body.dni;
            patient.phoneNumber = req.body.phoneNumber;
            patient.email = req.body.email;
            patient.nationality = req.body.nationality;
            patient.educationDegree = req.body.educationDegree;
            patient.tutor = req.body.tutor;

            Patient.updateOne({ id: req.params.id }, patient)
                .then(result => {
                    console.log('success')
                    res.status(204).json({
                        message: 'Patient updated successfully'
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
                message: 'Patient not found.',
                error: { patient: 'Patient not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Patient.findOne({ id: req.params.id })
        .then(patient => {
            Patient.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Patient deleted successfully"
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
                message: 'Patient not found.',
                error: { patient: 'Patient not found' }
            });
        });
});

module.exports = router; 