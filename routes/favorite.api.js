const express = require("express");
const router = express.Router();
const {
  createFavorite, // Click on the heart icon to add to favorites by providing post_id and user_id
  getFavoriteUserId, // Get all favorites for a user by providing user_id
  deleteFavorite, // Delete a favorite by ID
  deleteFavoriteByPostId, // Delete a favorite by providing post_id and user_id
  checkFavorite, // Check if a user has favorited a specific post
  getFavoriteCount, // Get count of favorites for a specific post
  getUsersByPost, // Get all users who favorited a specific post
} = require("../controllers/favorite.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

/**
 * @route POST api/favorites
 * @description Create a new favorite
 * @access Private
 */
router.post("/", loginRequired, createFavorite);

/**
 * @route DELETE api/favorites/:id
 * @description Delete favorite by id
 * @access Private
 */
router.delete("/:id", loginRequired, deleteFavorite);

/**
 * @route DELETE api/favorites/post/:post_id
 * @description Delete favorite by post_id for current user
 * @access Private
 */
router.delete("/post/:post_id", loginRequired, deleteFavoriteByPostId);

/**
 * @route GET api/favorites/user/:user_id
 * @description Get all favorites for a user by providing user_id
 * @access Private
 */
router.get("/user/:user_id", loginRequired, getFavoriteUserId);

/**
 * @route GET api/favorites/check/:post_id
 * @description Check if the current user has favorited a specific post
 * @access Private
 */
router.get("/check/:post_id", loginRequired, checkFavorite);

/**
 * @route GET api/favorites/count/:post_id
 * @description Get the number of favorites for a specific post
 * @access Public
 */
router.get("/count/:post_id", getFavoriteCount);

/**
 * @route GET api/favorites/post/:post_id/users
 * @description Get all users who favorited a specific post
 * @access Public
 */
router.get("/post/:post_id/users", getUsersByPost);

module.exports = router;
