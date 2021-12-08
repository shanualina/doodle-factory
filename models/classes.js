const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classesSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    weekday: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    timeOfDay: {
        type: String,
        enum: ['morning', 'afternoon', 'evening']
    },
    price: Number,
    startTime: String,
    endTime: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deletedAt: Date,
    type: {
        type: String,
        enum: ['kids', 'adults']
    }
})

const Classes = mongoose.model('classes', classesSchema);

module.exports = Classes;
