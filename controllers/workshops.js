const Workshop = require('../models/workshops');


const addWorkshop = async (req, res, next) => {
    try {
        const data = req.body;
        data.images = req.files.map(file => file.filename);
        const workshop = await new Workshop(data).save();
        res.status(201).json(workshop);
    } catch (error) {
        next(error);
    }
}


const getWorkshops = async (req, res, next) => {
    try {
        const workshops = await Workshop.find({
            deletedAt: {
                $eq: null
            }
        });
        res.status(200).json(workshops);
    } catch (error) {
        next(error);
    }
}

const updateWorkshop = async (req, res, next) => {
    const _id = req.params.id;
    const data = req.body;

    try {
        const workshop = await Workshop.findOneAndUpdate({ _id }, data);
        res.status(200).json(workshop);
    } catch (error) {
        next(error);
    }
}

const deleteWorkshop = async (req, res, next) => {
    const _id = req.params.id;

    try {
        const workshop = await Workshop.findOneAndUpdate({ _id }, {
            deletedAt: Date.now()
        });
        res.status(204).json(workshop);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addWorkshop,
    getWorkshops,
    updateWorkshop,
    deleteWorkshop
}
