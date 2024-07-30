const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  T_id:Number,
  name: String,
  members: [String],
  emails: [String],
  createdBy:String,
  
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;