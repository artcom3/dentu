const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxPatientId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema);