const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

/**
 * @route POST api/users
 * @description Create a new user
 * @access Public
 */
router.post("/", userController.createUser);

/**
 * @route GET api/users
 * @description Get list of users
 * @access Private (Admin only)
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * @route GET api/users/me
 * @description Get current user profile
 * @access Private
 */
router.get("/me", authMiddleware, userController.getCurrentUser);

/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access Private
 */
router.get("/:id", authMiddleware, userController.getUserById);

/**
 * @route PUT api/users/:id
 * @description Update user by id
 * @access Private
 */
router.put("/:id", authMiddleware, userController.updateUser);

/**
 * @route DELETE api/users/:id
 * @description Delete user by id
 * @access Private
 */
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
