const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

/**
 * @route POST /api/user/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", userController.register);

/**
 * @route POST /api/user/login
 * @description Login with email and password
 * @access Public
 */
router.post("/login", userController.login);

/**
 * @route GET /api/user/me
 * @description Get current user profile
 * @access Private
 */
router.get("/me", loginRequired, userController.getCurrentUser);

module.exports = router;
