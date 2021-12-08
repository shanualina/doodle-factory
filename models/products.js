const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: String,
    description: String,
    price: Number,
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deletedAt: {
        type: Date,
        default: null
    }
})

const Product = mongoose.model('products', productSchema);

module.exports = Product;
