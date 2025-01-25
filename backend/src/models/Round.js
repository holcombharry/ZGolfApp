const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeholderUserId = '64fb89a11234567890abcdf1';

const scoreSchema = new Schema({
  golfer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the golfer
  score: { type: [Number], default: Array(18).fill(null) }, // Scores for each hole
});

const roundSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' }, // Need the bottom three in case someone doesn't want to go hole by hole
  golfers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // This will contain less than the group size if not everyone has an account
  groupSize: { type: Number },
  scorecard: { type: [scoreSchema], default: [] },
  front: { type: Number }, // Need the bottom three in case someone doesn't want to go hole by hole
  back: { type: Number },
  total: { type: Number }, 
  currentHole: { type: Number, default: 1 },
  matchType: { 
    type: String, 
    enum: ['Match Play', 'Stroke Play', 'Scramble', 'Best Ball']
  },
  date: { type: Date, required: true }
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
});

// Pre-save middleware to populate the scorecard and fill missing golfers
roundSchema.pre('save', function (next) {
  // Populate scorecard if empty
  if (this.groupSize && this.scorecard.length === 0) {
    // First ensure golfers array is populated with placeholders
    if (this.golfers.length < this.groupSize) {
      const placeholdersNeeded = this.groupSize - this.golfers.length;
      const placeholders = Array(placeholdersNeeded).fill(placeholderUserId);
      this.golfers = this.golfers.concat(placeholders);
    }
    
    // Create scorecard using golfers array
    this.scorecard = this.golfers.map(golferId => ({
      golfer: golferId,
      score: Array(18).fill(null),
    }));
  }

  next();
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;