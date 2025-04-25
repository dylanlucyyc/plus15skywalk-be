//Create schema
const mongoose = require("mongoose");

//Create and export model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  avatar_url: String,
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
