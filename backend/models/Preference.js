const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  location: String,
  minBudget: Number,
  maxBudget: Number,
  roommatePreference: String,
  roomType: String,
  sharing: String,
  sleepSchedule: String,
  smoking: String,
  guests: String,
  pets: String,
  social: String,
  cleanliness: String
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);
