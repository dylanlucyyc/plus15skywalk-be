const express = require("express");
const router = express.Router();
const {
  createFavorite,
  getAllFavorites,
  getFavoriteById,
  deleteFavorite,
  deleteFavoriteByPostId,
} = require("../controllers/favorite.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

/**
 * @route POST api/favorites
 * @description Create a new favorite
 * @access Private
 */
router.post("/", loginRequired, createFavorite);

/**
 * @route GET api/favorites
 * @description Get list of favorites for current user
 * @access Private
 */
router.get("/", loginRequired, getAllFavorites);

/**
 * @route GET api/favorites/:id
 * @description Get favorite by id
 * @access Private
 */
router.get("/:id", loginRequired, getFavoriteById);

/**
 * @route DELETE api/favorites/:id
 * @description Delete favorite by id
 * @access Private
 */
router.delete("/:id", loginRequired, deleteFavorite);

/**
 * @route DELETE api/favorites/post/:post_id
 * @description Delete favorite by post id
 * @access Private
 */
router.delete("/post/:post_id", loginRequired, deleteFavoriteByPostId);

module.exports = router;
