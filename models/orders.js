const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    _id: String,
    receipt: String,
    amount: Number,
    status: String,
    created_at: Date,
    entity: String,
    paymentId: String
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
