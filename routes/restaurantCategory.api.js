const express = require("express");
const router = express.Router();
const {
  createRestaurantCategory,
  getAllRestaurantCategory,
  getRestaurantCategoryById,
  updateRestaurantCategoryById,
  deleteRestaurantCategoryById,
} = require("../controllers/restaurantCategory.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

/**
 * @route POST api/restaurant-categories
 * @description Create a new restaurant category
 * @access Private
 */
router.post("/", loginRequired, createRestaurantCategory);

/**
 * @route GET api/restaurant-categories
 * @description Get list of restaurant categories
 * @access Public
 */
router.get("/", getAllRestaurantCategory);

/**
 * @route GET api/restaurant-categories/:id
 * @description Get restaurant category by id
 * @access Public
 */
router.get("/:id", getRestaurantCategoryById);

/**
 * @route PUT api/restaurant-categories/:id
 * @description Update restaurant category by id
 * @access Private
 */
router.put("/:id", loginRequired, updateRestaurantCategoryById);

/**
 * @route DELETE api/restaurant-categories/:id
 * @description Delete restaurant category by id
 * @access Private
 */
router.delete("/:id", loginRequired, deleteRestaurantCategoryById);

module.exports = router;
