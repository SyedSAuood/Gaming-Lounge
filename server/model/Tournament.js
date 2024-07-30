const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const tournamentSchema = new mongoose.Schema({
//   id:mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  gameName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: { type: String, required: true },
  registrationDeadline: { type: Date, required: true },
  format:{type:String, require:true},
//   teams:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Team'
//   }],
//   singleplayers:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Singleplayer'
//   }]
});

tournamentSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
