const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  par: { type: Number }, // Par of the course
  holes: { type: Number }, // Number of holes
  scorecard: { type: [Number] }
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
