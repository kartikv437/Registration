const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: String,
    password: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    access_token: String,
    age: Number,
    gender: String,
    dob: Date
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('users', userSchema, "_users");