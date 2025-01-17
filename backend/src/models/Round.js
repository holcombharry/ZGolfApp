const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' }, // Need the bottom three in case someone doesn't want to go hole by hole
  golfers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // This will contain less than the group size if not everyone has an account
  groupSize: { type: Number },
  score: { type: [Number], default: Array(18).fill(null) }, // Array of scores per hole
  front: { type: Number }, // Need the bottom three in case someone doesn't want to go hole by hole
  back: { type: Number },
  total: { type: Number }, 
  matchType: { 
    type: String, 
    enum: ['Match Play', 'Stroke Play', 'Scramble', 'Best Ball']
  },
  date: { type: Date, required: true }
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;