const express = require("express");
const router = express.Router();

const sequenceGenerator = require("./sequenceGenerator");
const { Task, DailyTasks } = require("../models/task");

// GET retrieves tasks for a specific date
router.get("/byDate/:date", async function (req, res, next) {
  try {
    const date = req.params.date;
    const dailyTasks = await DailyTasks.findOne({ date: date }).exec();

    if (!dailyTasks) {
      // If no tasks found for the date, return an empty array
      return res.status(200).json({
        message: "No Tasks found for the specified date",
        dayId: null,
        tasks: [],
      });
    }
    // If tasks found, return them
    res.status(200).json({
      message: "Tasks fetched successfully",
      dayId: dailyTasks.dayId,
      tasks: dailyTasks.tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching tasks",
      error: err,
    });
  }
});

// POST adds a new task for a specific date
// If the date does not exist, it creates a new date entry
router.post("/", async (req, res, next) => {
  try {
    // Check if the date is provided in the request body
    if (!req.body.date) {
      return res.status(400).json({
        message: "Date is required to add a task",
      });
    }

    const chosenDate = req.body.date; // Extract the provided date from the request body

    nextTaskId = await sequenceGenerator.nextId("tasks");

    const newTask = {
      id: nextTaskId.toString(),
      title: req.body.title?.trim(),
      details: req.body.details?.trim() || null,
      startTime: req.body.startTime?.trim() || null,
      endTime: req.body.endTime?.trim() || null,
      status: req.body.status?.trim() || "Incomplete",
    };
    console.log("Adding new task:", newTask, "for date:", chosenDate);

    // Try to find existing tasks for the chosen date
    let dailyTasks = await DailyTasks.findOne({ date: chosenDate }).exec();

    console.log("DailyTasks for date:", chosenDate, dailyTasks);
    if (!dailyTasks) {
      const nextDayId = await sequenceGenerator.nextId("days");

      // If no tasks exist for the date, create a new DailyTasks object
      dailyTasks = new DailyTasks({
        dayId: nextDayId.toString(),
        date: chosenDate,
        tasks: [newTask],
      });
    } else {
      // If tasks already exist for the date, add the new task to the tasks array
      dailyTasks.tasks.push(newTask);
    }
    // Save the updated or new DailyTasks object
    const savedDailyTasks = await dailyTasks.save();

    res.status(201).json({
      message: "Task added successfully",
      dailyTasks: savedDailyTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the task",
      error: error,
    });
  }
});

router.put("/:dayId/:id", async (req, res) => {
  // extract all the parameters from the request
  const dayId = req.params.dayId;
  const taskId = req.params.id;
  const {
    title,
    details,
    startTime,
    endTime,
    status,
    date: newDate,
  } = req.body;

  try {
    // Find the tasks original day object by its current dayId
    const origDailyTasks = await DailyTasks.findOne({ dayId }).exec();

    if (!origDailyTasks) {
      return res.status(404).json({
        message: `No daily tasks found for dayId "${dayId}".`,
      });
    }

    const task = origDailyTasks.tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).json({
        message: `Task with ID "${taskId}" not found in dayId "${dayId}".`,
      });
    }

    // Determine if it's an in-place update or a move to a new date
    const moving = newDate && newDate !== origDailyTasks.date;

    if (!moving) {
      Object.assign(task, {
        title: title?.trim() || task.title,
        details: details?.trim() || task.details,
        startTime: startTime?.trim() || task.startTime,
        endTime: endTime?.trim() || task.endTime,
        status: status?.trim() || task.status,
      });
      await origDailyTasks.save();
      return res.status(200).json({
        message: "Task updated successfully",
        task: task,
        dailyTasks: origDailyTasks,
      });
    }

    // If moving, remove the task from the original day
    await DailyTasks.updateOne(
      { dayId },
      { $pull: { tasks: { id: taskId } } }
    ).exec();

    // Find the new daily tasks for the task to be moved to
    let newDailyTasks = await DailyTasks.findOne({ date: newDate }).exec();

    // If no daily tasks exist for the new date, create a new one
    if (!newDailyTasks) {
      const nextDayId = await sequenceGenerator.nextId("days");
      newDailyTasks = new DailyTasks({
        dayId: nextDayId.toString(),
        date: newDate,
        tasks: [],
      });
    }

    const movedTask = {
      ...task.toObject(), // duplicate the task object
      id: taskId, // Ensure the ID remains the same
      title: title.trim(),
      details: details?.trim() || null,
      startTime: startTime?.trim() || task.startTime,
      endTime: endTime?.trim() || task.endTime,
      status: status?.trim() || task.status,
    };

    newDailyTasks.tasks.push(movedTask);
    const savedNewDay = await newDailyTasks.save();

    return res.json({
      message: "Task moved and updated successfully.",
      task: movedTask,
      dailyTasks: savedNewDay,
    });
  } catch (error) {
    console.error("Error in PUT /:dayId/:id:", error);
    return res.status(500).json({
      message: "Failed to update/move task.",
      error: error.toString(),
    });
  }
});

router.delete("/:dayId/:id", async (req, res, next) => {
  try {
    const dayId = req.params.dayId;
    const taskId = req.params.id;

    // Find the daily tasks for the specified day
    const dailyTasks = await DailyTasks.findOne({ dayId: dayId }).exec();
    if (!dailyTasks) {
      return res.status(404).json({
        message: "Daily tasks not found",
      });
    }
    const taskIndex = dailyTasks.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({
        message: "Task not found",
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
        message: "All tasks deleted for the day",
        dailyTasks: null,
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      dailyTasks: updatedDailyTasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task",
      error: err,
    });
  }
});

module.exports = router;
