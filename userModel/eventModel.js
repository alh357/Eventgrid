const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
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
  interested: {
    type: Number,
    required: true,
  },
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
