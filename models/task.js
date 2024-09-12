// models/task.mjs
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    task_description: { type: String },
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

taskSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
