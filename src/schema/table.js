const mongoose = require('mongoose');
const schema =mongoose.Schema;

const tableSchema = new schema({
    firstName:String,
    middleName:String,
    lastName:String,
    age:Number,
    gender:String,
    dob:Date
},{timestamps:true});

 module.exports =mongoose.model('tableData',tableSchema,'tableData');