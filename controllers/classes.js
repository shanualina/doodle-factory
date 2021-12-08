const Classes = require('../models/classes');


const addClasses = async (req, res, next) => {
    try {
        const data = req.body;

        const classes = await new Classes(data).save();
        res.status(201).json(classes);
    } catch (error) {
        next(error);
    }
}

const getClass = async (req, res, next) => {
    try {
        const classes = await Classes.findOne({
            _id: req.body.id,
            deletedAt: {
                $eq: null
            }
        })

        res.json(classes);
    } catch (error) {
        next(error);
    }
}


const getClasses = async (req, res, next) => {
    try {
        const classes = await Classes.find({
            deletedAt: {
                $eq: null
            }
        });
        res.status(200).json(classes);
    } catch (error) {
        next(error);
    }
}

const updateClasses = async (req, res, next) => {
    const _id = req.params.id;
    const data = req.body;

    try {
        const classes = await Classes.findOneAndUpdate({ _id }, data);
        res.status(200).json(classes);
    } catch (error) {
        next(error);
    }
}

const deleteClasses = async (req, res, next) => {
    const _id = req.params.id;

    try {
        const classes = await Classes.findOneAndUpdate({ _id }, {
            deletedAt: Date.now()
        });
        res.status(204).json(classes);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addClasses,
    getClasses,
    updateClasses,
    deleteClasses,
    getClass
}
