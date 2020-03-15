const TASK_SERVICE = require('../services/Task.service');

exports.addTask = async (req, res, next) => {

    try {
        const task = req.body;
        const username = req.payload.username;

        if (!task.name) {
            return res.status(422).json({
                error: 'Task Name is missing',
            });
        }

        const savedTask = await TASK_SERVICE.addTask(task, username);

        return res.status(200).json(savedTask);
    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const task = req.body;
        const username = req.payload.username;

        if (task.username !== username) {
            return res.status(403).json({
                error: 'NOT Authorised',
            });
        }

        if (!task.name) {
            return res.status(422).json({
                error: 'Task Name is missing',
            });
        }

        if (!task.id) {
            return res.status(422).json({
                error: 'Task Id is missing',
            });
        }

        const updatedTask = await TASK_SERVICE.updateTask(task);
        return res.status(200).json(updatedTask);
    }
    catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const username = req.payload.username;
        const taskId = req.params.taskId;

        if (!taskId) {
            return res.status(422).json({
                error: 'Task Id is missing',
            });
        }

        const deletedCount = await TASK_SERVICE.deleteTask(taskId, username);
        return res.status(200).json({'count': deletedCount});
    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
} 