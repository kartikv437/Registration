const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsDataSchema = new Schema({
    title: String,
    image: String,
    location: String,
    description: String,
    date: Date,
},
{
    timestamps: true,
    versionKey: false
});

module.exports =mongoose.model('blogData',blogsDataSchema);