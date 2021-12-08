const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workshopSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    price: Number,
    images: [String],
    workshopDate: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deletedAt: Date
})

const Workshop = mongoose.model('workshops', workshopSchema);

module.exports = Workshop;
