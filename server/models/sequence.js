const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
    maxDayId: { type: Number, required: true },
    maxTaskId: { type: Number, required: true }
}, {collection: 'sequences'});

module.exports = mongoose.model('Sequence', SequenceSchema); 