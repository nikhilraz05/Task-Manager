// routes/tasks.mjs
import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

// Create a task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// View all tasks with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const tasks = await Task.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalTasks = await Task.countDocuments();
        res.json({
            tasks,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// View a single task
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
