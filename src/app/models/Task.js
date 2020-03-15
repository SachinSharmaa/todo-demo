const Task = {
    id: {
        type: String,
        unique: true
    },
    username: String,
    name: String,
    description: String,
    done: Boolean,
    deleted: Boolean
};

module.exports = Task;