const passport = require('passport');
const USER_SERVICE = require('../services/User.service');

exports.createUser = async (req, res, next) => {

    try {
        const user = req.body;

        if (!user.username) {
            return res.status(422).json({
                error : 'username is missing',
            });
        }

        if (!user.password) {
            return res.status(422).json({
                error : 'password is missing',
            });
        }
        const savedUser = await USER_SERVICE.createUser(user);

        return res.status(200).json(savedUser);
    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
}

// TODO: Need to check how to segregate into service
exports.login = (req, res, next) => {
    const user = req.body;

    if (!user.username) {
        return res.status(422).json({
            error: 'username is missing',
        });
    }

    if (!user.password) {
        return res.status(422).json({
            error: 'password is missing',
        });
    }

    return passport.authenticate('local', {
        session: false
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.status(200).json({
                user: user.toAuthJSON()
            });
        }

        return res.status(400).json(info);
    })(req, res, next);
}

exports.getUser = async (req, res, next) => {
    const username = req.payload.username;
    try {
        return res.status(200).json(await USER_SERVICE.getUser(username));
    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
} 