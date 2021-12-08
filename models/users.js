const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: String,
    password: String
})

const User = mongoose.model('users', userSchema);

module.exports = User;
