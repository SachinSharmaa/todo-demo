const User = {
    username: {
        type: String,
        unique: true
    },
    password: String,
    tasks: [Number]
};

module.exports = User;