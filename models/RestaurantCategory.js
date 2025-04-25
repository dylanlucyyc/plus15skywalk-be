const mongoose = require("mongoose");

const restaurantCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["news", "event", "restaurant"],
  },
  icon: String,
  isDeleted: { type: Boolean, default: false },
});

const RestaurantCategory = mongoose.model(
  "RestaurantCategory",
  restaurantCategorySchema
);
module.exports = RestaurantCategory;
