const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  professionalDetails: { type: String, required: false },
  contactEmail: { type: String, required: false }, // Optional contact email for the event
  contactPhone: { type: String, required: false },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  hiring: {
    type: Boolean,
    required: true,
  },
  hiring1: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  interested: { type: Number, default: 0 },
  interestedPeople: { type: [String], default: [] },
  lookingFor: {
    type: String,
    default: "none",
  },
  type: {
    type: String,
    default: "event",
  },
  createdAt: { type: Date, default: Date.now },
});

const event = mongoose.model("event", eventSchema);
module.exports = event;
