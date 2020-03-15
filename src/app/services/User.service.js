const USER_REPOSITORY = require('../repositories/User.Repository');
const TASK_SERVICE = require('./Task.service');
const ASYNC_FOR_EACH = require('../utilities/AsyncForEach');
exports.createUser = async (user) => {
    try {
        const finalUser = new USER_REPOSITORY(user);

        finalUser.setPassword(user.password);

        const savedUser = await finalUser.save();

        return savedUser.toAuthJSON();
    } catch (e) {
        throw Error("OOPS Could Not Add User " + e.errmsg)
    }
}

exports.getUser = async (username) => {
    try {
        const user = await USER_REPOSITORY.findOne({ 'username': username });
        await getTasksDetails(user);
        return {
            user: user.username,
            tasks: user.tasks,
        };
    } catch (e) {
        throw Error("OOPS Could Not Fetch User " + e.errmsg)
    }
}

exports.addTask = async (username, taskId) => {
    try {
        await USER_REPOSITORY.updateOne({
            'username': username
        }, {
            $push: {
                'tasks': taskId
            }
        });
    } catch (e) {
        throwError("OOPS Could Not Add Task " + e.errmsg)
    }
}

const getTasksDetails = async user => {
    try {
        const taskIds = [...user.tasks];
        user.tasks = [];
        await ASYNC_FOR_EACH.asyncForEach(taskIds, async taskId => {
            const task = await TASK_SERVICE.getTask(taskId);
            user.tasks.push(task);
        });
    } catch (e) {
        throw Error("OOPS Could Not Fetch User Tasks " + e.errmsg)
    }
}

exports.deleteTask = async (username,taskId) => {
    try {
        const updatedCount = await USER_REPOSITORY.updateOne({'username': username}, {
            $pull : {
                'tasks' : taskId
            }});
        return updatedCount;
    } catch (e) {
        throwError("OOPS Could Not Delete Task " + e.errmsg)
    }
}