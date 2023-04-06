const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    dni: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    nationality: { type: String },
    educationDegree: { type: String },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
});

module.exports = mongoose.model('Patient', patientSchema);