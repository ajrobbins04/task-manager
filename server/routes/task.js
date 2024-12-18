var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const { Task, DailyTask } = require('../models/task');

// GET - retrieve tasks for a specific date
router.get('/:date', async (req, res) => {
    try {
      const { date } = req.params;
      const dailyTask = await DailyTask.findOne({ date: date });

      if (!dailyTask) {
        return res.status(200).json([]); // return empty array if no tasks found for valid date
      }

      // tasks successfully found
      res.status(200).json(dailyTask.tasks);
      console.log("dailyTask second result: ", dailyTask);
    } catch (error) {
      // tasks not found
      res.status(500).json({ message: 'Failed to fetch tasks for the date', error: error });
    }
});

// POST - add a new task to DailyTask (if it already exists)
// otherwise, add new task after creating DailyTask
router.post('/', async (req, res) => {
    try {
    
      if (!req.body.chosenDate) {
        return res.status(400).json({ message: 'A date is required to add a task.' });
      }
  
      // generate the new task object using body of req object
      const newTask = ({
        id: sequenceGenerator.nextId('tasks'),
        title: req.body.title,
        details: req.body?.details || null,
        startTime: req.body?.startTime || null,
        endTime: req.body?.endTime || null,
        status: 'Incomplete',
      });
  
      // try to retrieve a dailyTask using the chosenDate
      let dailyTask = await DailyTask.findOne({ date: chosenDate });
  
      // create a dailyTask if one doesn't already exist
      if (!dailyTask) {

        dailyTask = new DailyTask({
          date: chosenDate, 
          tasks: [newTask]  // starts out as an array with just one task
        });
      } else {
        dailyTask.tasks.push(newTask); // add to dailyTask's array of tasks
      }
  
      const savedDailyTask = await dailyTask.save();

      // indicates the object was successfully created
      res.status(201).json(savedDailyTask);

    } catch (error) {
        // internal server error sent if failure to add occurs
        res.status(500).json({ message: 'Failed to add the task', error: error });
    }
});

module.exports = router; 