const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

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
router.get("/", loginRequired, userController.getAllUsers);

/**
 * @route GET api/users/me
 * @description Get current user profile
 * @access Private
 */
router.get("/me", loginRequired, userController.getCurrentUser);

/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access Private
 */
router.get("/:id", loginRequired, userController.getUserById);

/**
 * @route PUT api/users/:id
 * @description Update user by id
 * @access Private
 */
router.put("/:id", loginRequired, userController.updateUser);

/**
 * @route DELETE api/users/:id
 * @description Delete user by id
 * @access Private
 */
router.delete("/:id", loginRequired, userController.deleteUser);

module.exports = router;
