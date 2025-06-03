const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionSchema = new Schema({
    version: String,
    dashboard: String,
}, {
    timestamps: true,
    versionKey: false,
    collection: 'versions'
})

module.exports = mongoose.model('versions', versionSchema);