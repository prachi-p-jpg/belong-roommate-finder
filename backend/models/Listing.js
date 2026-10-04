const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  rent: Number,
  roomType: String,
  sharing: String,
  roommates: Number,
  smoking: String,
  pets: String,
  guests: String,
  sleepSchedule: String,
  social: String,
  cleanliness: String,
  image: String,
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
