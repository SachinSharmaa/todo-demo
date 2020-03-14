const USER_REPOSITORY = require('../repositories/User.Repository');

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

exports.getUserById = async (id) => {
    try {
        const user = await USER_REPOSITORY.findById(id);
        return user.userInfo();
    } catch (e) {
        throw Error("OOPS Could Not Fetch User " + e.errmsg)
    }
}