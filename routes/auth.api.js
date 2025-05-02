const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controllers.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

/**
 * @route POST api/auth/login
 * @description Login with email and password
 * @access Public
 */
router.post("/login", login);

module.exports = router;
