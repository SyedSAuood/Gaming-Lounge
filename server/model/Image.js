const mongoose = require('mongoose');

const Imageschema = new mongoose.Schema({
    image:String,
    name:String,
    react:Number
})
const imagemodel = mongoose.model("imagemodel",Imageschema)

module.exports = imagemodel