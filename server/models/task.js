const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: {                // unique task ID
        type: String,   
        required: true,  
        unique: true    
      },
      title: {           // task title
        type: String,  
        required: true  
      },
      details: {
        type: String,    // optional task details
        default: null    
      },
      startTime: {
        type: String,    // optional start time
        default: null  
      },
      endTime: {
        type: String,    // optional end time
        default: null    
      },
      status: {
        type: String,    // task completion status
        enum: ['Incomplete', 'Completed'], // only these values allowed
        default: 'Incomplete'
      }
})

// now define the outer structure, where tasks are grouped by day
const dailyTaskSchema = new mongoose.Schema({
    date: { type: String, required: true }, // the chosen date
    tasks: [taskSchema] // the array of tasks to be completed on that day
  });
  
  // Export the model
  module.exports = mongoose.model('DailyTask', dailyTaskSchema);