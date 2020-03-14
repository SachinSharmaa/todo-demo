const Task = {
    id: {
        type: Number,
        unique: true
    },
    name: String,
    description: String,
    done: Boolean,
    deleted: Boolean
};

module.exports = Task;