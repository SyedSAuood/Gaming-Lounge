const mongoose = require('mongoose');

const singleplayerSchema = new mongoose.Schema({
        player: String,
        email: String,
        T_id: Number,
    });

const Singleplayer = mongoose.model('Singleplayer',singleplayerSchema)
module.exports=Singleplayer;