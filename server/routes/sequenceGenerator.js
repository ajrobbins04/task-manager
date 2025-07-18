const Sequence = require('../models/sequence');

class SequenceGenerator {
    constructor() {
        this.sequenceId = null; // will be set after fetching from the database
        this.maxTaskId = 0; // default values
        this.maxDayId = 0;
    }
    
    async initializeGenerator() {
        try {
            const seq = await Sequence.findOne().exec();

            if (seq) {
                this.sequenceId = seq._id;
                this.maxTaskId = seq.maxTaskId;
                this.maxDayId = seq.maxDayId;

            } else {
                console.error('No sequence document found');
            }
        } catch (err) {
            console.error('Failed to fetch max ID:', err);
        }
    }
    async nextId(collectionType) {
        let dbFieldName;

        switch (collectionType) {
            case 'tasks':
                dbFieldName = 'maxTaskId';
                break;
            case 'days':
                dbFieldName = 'maxDayId';
                break;
            default:
                return -1;
        }

        try {
            const updatedSequence = await Sequence.findOneAndUpdate(
                { _id: this.sequenceId },
                { $inc: { [dbFieldName]: 1 } },
                { new: true }
            ).exec();

            if (!updatedSequence) {
                throw new Error('Sequence document not found');
            }

            // Update local copy
            this[dbFieldName] = updatedSequence[dbFieldName];
            return updatedSequence[dbFieldName];

        } catch (err) {
            console.error('Error generating next ID:', err);
            throw err;
        }
    }
}  

const sequenceGenerator = new SequenceGenerator();
module.exports = sequenceGenerator;