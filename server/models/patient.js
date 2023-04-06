const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Number, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    dni: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    nationality: { type: String },
    educationDegree: { type: String },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
});

module.exports = mongoose.model('Patient', patientSchema);