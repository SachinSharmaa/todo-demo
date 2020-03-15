const User = {
    username: {
        type: String,
        unique: true
    },
    hash: String,
    salt: String,
    tasks: [String]
};

module.exports = User;