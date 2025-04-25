const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  post_type: {
    type: String,
    enum: ["news", "event", "restaurant"],
    required: true,
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: String,
  image: String,
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  created_at: { type: Date, default: Date.now },

  // Conditional data based on post_type
  event_details: {
    date: Date,
    location: String,
    description: String,
  },

  restaurant_details: {
    longitude: Number,
    latitude: Number,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RestaurantCategory",
      },
    ],
    price_range: {
      type: String,
      enum: ["$", "$$", "$$$", "$$$$"],
    },
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
