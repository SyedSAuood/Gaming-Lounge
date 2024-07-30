const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId:{type: String, require: true},
    username:{type:String , require:true},
    access_token:{type:String, require:true}
})

const User = mongoose.model("User",UserSchema);

module.exports = User