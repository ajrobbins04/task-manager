const Sequence = require('../models/sequence');

function SequenceGenerator() {
      this.sequenceId = null;
      this.maxTaskId = 0;
}  

SequenceGenerator.prototype.initializeGenerator = async function () {
    try {
      const sequence = await Sequence.findOne().exec();

      if (sequence) {
        this.sequenceId = sequence._id;
        this.maxTaskId = sequence.maxTaskId;
        
      } else {
        console.error('No sequence document found');
      }
    } catch (err) {
      console.error('Failed to fetch max ID:', err);
    }
  };

  SequenceGenerator.prototype.nextId = async function(collectionType) {

    let dbFieldName; // the field containing the id value to increment

    // may add other collections later on
    switch (collectionType) {
      case 'tasks':
        dbFieldName = 'maxTaskId';
        break;
      default:
        throw new Error(`Unsupported collection type: ${collectionType}`);
    }
   
    try {
        const updatedSequence = await Sequence.findOneAndUpdate(
            { _id: this.sequenceId },
            { $inc: { [dbFieldName]: 1 } },
            { new: true, useFindAndModify: false }
        ).exec();

        if (!updatedSequence) {
            throw new Error('Sequence document not found');
        }

        console.log('Updated sequence:', updatedSequence);
        return updatedSequence[dbFieldName];
    } catch (err) {
        console.error('Error generating next ID:', err);
        throw err;
    }
};
  
  // export the singleton instance and initialize it
  const sequenceGeneratorInstance = new SequenceGenerator();
  sequenceGeneratorInstance.initializeGenerator(); 
  module.exports = sequenceGeneratorInstance;
