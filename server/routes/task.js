const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const { Task, DailyTasks } = require('../models/task');

// GET retrieves tasks for a specific date
router.get('/byDate/:date', async function(req, res, next) {
    try {
        const date = req.params.date;
        const dailyTasks = await DailyTasks.findOne({ date: date }).exec();

        if (!dailyTasks) {
            // If no tasks found for the date, return an empty array
            return res.status(200).json({
                message: 'No Tasks found for the specified date',
                dayId: null,
                tasks: []
            });
        }
        // If tasks found, return them
        res.status(200).json({
            message: 'Tasks fetched successfully',
            dayId: dailyTasks.dayId,
            tasks: dailyTasks.tasks
        });
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching tasks',
            error: err
        });
    }
});

// POST adds a new task for a specific date
// If the date does not exist, it creates a new date entry
router.post('/', async (req, res, next) => {
    try {

        // Check if the date is provided in the request body
        if (!req.body.date) {
            return res.status(400).json({
                message: 'Date is required to add a task'
            });
        }
        const chosenDate = req.body.date; // Extract the provided date from the request body

        // generate a new task ID for the new task
        const nextTaskId = await sequenceGenerator.nextId('tasks');

        // Ensure the task title is provided and not empty
        if (!req.body.title?.trim()) {
            return res.status(400).json({ 
                message: 'Task title is required' });
        }
          
        const newTask = {
            id: nextTaskId,
            title: req.body.title?.trim(),
            details: req.body.details?.trim() || null,
            startTime: req.body.startTime?.trim() || null,
            endTime: req.body.endTime?.trim() || null,
            status: req.body.status?.trim() || 'Incomplete'
        };
        
        // Try to find existing tasks for the chosen date
        let dailyTasks = await DailyTasks.findOne({ date: chosenDate }).exec();

        if (!dailyTasks) {
            const nextDayId = await sequenceGenerator.nextId('days');

            // If no tasks exist for the date, create a new DailyTasks object
            dailyTasks = new DailyTasks({
                dayId: nextDayId,
                date: chosenDate,
                tasks: [newTask]
            });
        } else {
            // If tasks already exist for the date, add the new task to the tasks array
            dailyTasks.tasks.push(newTask);
        }

        // Save the updated or new DailyTasks object
        const savedDailyTasks = await dailyTasks.save();
  
      res.status(201).json({
        message: 'Task added successfully',
        task: newTask,
        dailyTasks: savedDailyTasks
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred while adding the task',
        error: error
      });
    }
  });

router.put('/:dayId/:taskId', async (req, res, next) => {
    try {
        const dayId = req.params.dayId;
        const taskId = req.params.taskId;

        // Find the daily tasks for the specified day
        const dailyTasks = await DailyTasks.findOne({ dayId: dayId }).exec();

        // If no daily tasks found, return an error
        if (!dailyTasks) {
            return res.status(404).json({
                message: 'Daily tasks not found'
            });
        }
        const task = dailyTasks.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }   

        // Update the task properties
        task.title = req.body.title?.trim() || task.title;
        task.details = req.body.details?.trim() || task.details;
        task.startTime = req.body.startTime?.trim() || task.startTime;
        task.endTime = req.body.endTime?.trim() || task.endTime;
        task.status = req.body.status?.trim() || task.status;
 

        // Save the updated daily tasks
        const updatedDailyTasks = await dailyTasks.save();

        res.status(200).json({
            message: 'Task updated successfully',
            task: task,
            dailyTasks: updatedDailyTasks
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update task',
            error: err
        });
    }
});

router.delete('/:dayId/:taskId', async (req, res, next) => {
    try {
        const dayId = req.params.dayId;
        const taskId = req.params.taskId;
        const dailyTasks = await DailyTasks.findOne({ dayId: dayId }).exec();
        if (!dailyTasks) {
            return res.status(404).json({
                message: 'Daily tasks not found'
            });
        }
        const taskIndex = dailyTasks.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        // Remove the task from the tasks array
        dailyTasks.tasks.splice(taskIndex, 1);

        // Save the updated daily tasks
        const updatedDailyTasks = await dailyTasks.save();


        if (updatedDailyTasks.tasks.length === 0) {
            // If no tasks left, delete the daily tasks entry
            await DailyTasks.deleteOne({ dayId: dayId }).exec();
            return res.status(200).json({
                message: 'All tasks deleted for the day',
                dailyTasks: null
            });
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            dailyTasks: updatedDailyTasks
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete task',
            error: err
        });
    }
});
  
module.exports = router; 