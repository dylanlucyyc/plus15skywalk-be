const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  post_type: {
    type: String,
    enum: ["news", "events", "restaurants"],
    required: true,
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  content: String,
  image: String,
  tags: String,
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
    address: String,
    opening_hours: String,
    // category: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "RestaurantCategory",
    //   },
    // ],
    price_range: {
      type: String,
      enum: ["$", "$$", "$$$", "$$$$"],
    },
  },
  isDeleted: { type: Boolean, default: false },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
