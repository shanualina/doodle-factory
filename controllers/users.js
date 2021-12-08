const User = require('../models/users');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/auth');


const createUser = async (req, res, next) => {
    const obj = {
        username: req.body.username,
        password: req.body.password
    }

    const saltRounds = 10;

    try {
        obj.password = await bcrypt.hash(obj.password, saltRounds);
        let user = await User.findOne({
            username: obj.username
        });

        if (!!user) {
            return res.status(409).send('User already exist');
        }

        user = await User(obj).save();

        const token = createToken(user);
        res.status(201).json({
            name: user.name,
            token: token
        });
    } catch (error) {
        next(error);
    }
}


const login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username
    });

    try {
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).send('Invalid Password');
        }

        const token = createToken(user);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }

}


module.exports = {
    createUser,
    login
};
