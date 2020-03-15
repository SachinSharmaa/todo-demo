const TASK_REPOSITORY = require('../repositories/Task.Repository');
const USER_SERVICE = require('./User.service');

exports.addTask = async (task, username) => {
    let savedTask = null;
    try {
        const finalTask = new TASK_REPOSITORY(task);
        finalTask.setID();
        finalTask.username = username;
        savedTask = await finalTask.save();
    } catch (e) {
        throw Error("OOPS Could Not Add Task " + e.errmsg)
    }
    if (await addTaskToUser(savedTask.id, username)) {
        return savedTask;
    }
    throw Error("OOPS Could Not Assign Task to User ");
}

const addTaskToUser = async (taskId, username) => {
    try {
        await USER_SERVICE.addTask(username, taskId);
        return true;
    } catch (e) {
        await TASK_REPOSITORY.deleteOne({ 'id': taskId });
        return false;
    }
}

exports.getTask = async (taskId) => {
    try {
        const task = await TASK_REPOSITORY.findOne({ 'id': taskId });
        return task;
    } catch (e) {
        throw Error("OOPS Could Not Fetch Task" + e.errmsg);
    }
}

exports.updateTask = async (task) => {
    try {
        await TASK_REPOSITORY.updateOne({'id': task.id},{
            '$set' : {
                'name' : task.name,
                'description' : task.description,
                'done': task.done,
                'deleted': task.deleted
            }
        });
        return task; 
    } catch (e) {
        throw Error("OOPS Could Not Update Task" + e.errmsg);
    }
}

exports.deleteTask = async (taskId,username) => {
    try {
        const task = await TASK_REPOSITORY.findOne({'id': taskId});
        if(username !== task.username) {
            throw Error('You are not authorised.');
        }
        if(!task.deleted) {
            throw Error('Move Task to RecycleBin First');
        }
        const tasksDeleted = await USER_SERVICE.deleteTask(username,taskId);
        if(tasksDeleted) {
            const deletedCount = await TASK_REPOSITORY.deleteOne({'id': taskId});
            return deletedCount;
        }
        return 0;
    } catch (e) {
        throw Error("OOPS Could Not Delete Task" + e.errmsg);
    }
}