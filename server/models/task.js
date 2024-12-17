const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
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
const DailyTaskSchema = new mongoose.Schema({
    date: { type: String, required: true }, // the chosen date
    tasks: [TaskSchema] // the array of tasks to be completed on that day
  });
  
  // define the models
  const Task = mongoose.model('Task', TaskSchema);
  const DailyTask = mongoose.model('DailyTask', DailyTaskSchema);
  
  
  module.exports = {
    Task,
    DailyTask
  };