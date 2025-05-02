const { sendResponse, AppError } = require("../helpers/utils.js");
var express = require("express");
var router = express.Router();

// Import API routes
const userRouter = require("./user.api.js");
const postRouter = require("./post.api.js");
const favoriteRouter = require("./favorite.api.js");
const restaurantCategoryRouter = require("./restaurantCategory.api.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to the +15 Skywalk Website Project!");
});

// Use API routes
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/favorites", favoriteRouter);
router.use("/api/restaurant-categories", restaurantCategoryRouter);

module.exports = router;
