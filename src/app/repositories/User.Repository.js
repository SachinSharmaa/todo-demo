const mongoose = require('mongoose');

const UserModel = require('../models/User');

const UserSchema = mongoose.Schema(UserModel, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);