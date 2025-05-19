const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostBySlug,
  getPostByUser,
} = require("../controllers/post.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

/**
 * @route POST api/posts
 * @description Create a new post
 * @access Private
 */
router.post("/", loginRequired, createPost);

/**
 * @route GET api/posts
 * @description Get list of posts with optional filters
 * @access Public
 */
router.get("/", getAllPosts);

/**
 * @route GET api/posts/:id
 * @description Get post by id
 * @access Public
 */
router.get("/:id", getPostById);

/**
 * @route PUT api/posts/:id
 * @description Update post by id
 * @access Private
 */
router.put("/:id", loginRequired, updatePost);

/**
 * @route DELETE api/posts/:id
 * @description Delete post by id
 * @access Private
 */
router.delete("/:id", loginRequired, deletePost);

router.get("/slug/:slug", getPostBySlug);

router.get("/user/:userId", getPostByUser);

module.exports = router;
