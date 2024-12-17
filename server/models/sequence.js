const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
    maxTaskId: {
        type: Number,
        required: true
    }
}, { collection: 'sequences' }); 

module.exports = mongoose.model('Sequence', SequenceSchema);
