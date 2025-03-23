const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

// Get all tasks for a user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' }); // Return JSON response
  }
});

// Add a new task
router.post('/', auth, async (req, res) => {
  const { title, description, status, priority, dueDate, type } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      type,
      user: req.user.id,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' }); // Return JSON response
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' }); // Return JSON response
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting task with ID:', req.params.id);
    console.log('Logged-in user ID:', req.user.id);

    let task = await Task.findById(req.params.id);
    console.log('Task found:', task);

    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      console.log('User not authorized to delete this task');
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    console.log('Task deleted successfully');
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
