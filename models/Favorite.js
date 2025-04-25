const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
