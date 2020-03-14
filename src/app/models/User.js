const User = {
    username: {
        type: String,
        unique: true
    },
    hash: String,
    salt: String,
    tasks: [Number]
};

module.exports = User;