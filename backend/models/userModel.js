const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
  },
  rentedItem: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
