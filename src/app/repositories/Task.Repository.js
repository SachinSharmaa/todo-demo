const mongoose = require('mongoose');

const TaskModel = require('../models/Task');

const TaskSchema = mongoose.Schema(TaskModel, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);