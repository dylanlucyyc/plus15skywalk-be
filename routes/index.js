const { sendResponse, AppError } = require("../helpers/utils.js");
var express = require("express");
var router = express.Router();

// Import API routes
const userRouter = require("./user.api.js");
const postRouter = require("./post.api.js");
const favoriteRouter = require("./favorite.api.js");
const subscriberRouter = require("./subscriber.api.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to the +15 Skywalk Website Project!");
});

// Use API routes
router.use("/api/user", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/favorites", favoriteRouter);
router.use("/api/subscribers", subscriberRouter);

module.exports = router;
