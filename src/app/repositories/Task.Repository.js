const mongoose = require('mongoose');

const TaskModel = require('../models/Task');
const UUID_GENERATOR = require('../utilities/UUIDGenerator');
const TaskSchema = mongoose.Schema(TaskModel, {
    timestamps: true
});

TaskSchema.methods.setID = function() {
    this.id = UUID_GENERATOR.generateUUID();
}

module.exports = mongoose.model('Task', TaskSchema);