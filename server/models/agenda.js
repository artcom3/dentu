const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    id: { type: String, required: true },
    patient: { type: String, required: true },
    time: { type: String, required: true },
    hour: { type: String, required: true },
    date: { type: String, required: true },
    treatment: { type: String, required: true },
    notes: { type: String },
});

module.exports = mongoose.model('Agenda', agendaSchema);