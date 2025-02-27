const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  destination: String,
  date: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
