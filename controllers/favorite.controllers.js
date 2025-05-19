const { sendResponse, AppError } = require("../helpers/utils.js");

const Favorite = require("../models/Favorite.js");

const favoriteController = {};

//Create Favorite
favoriteController.createFavorite = async (req, res, next) => {
  const { post_id } = req.body;
  const user_id = req.userId; // Assuming userId is set in the auth middleware

  try {
    if (!post_id || !user_id) {
      throw new AppError(
        400,
        "Bad Request",
        "Post ID and User ID are required"
      );
    }

    // Check if favorite already exists
    const existingFavorite = await Favorite.findOne({
      user_id,
      post_id,
      isDeleted: false,
    });

    if (existingFavorite) {
      throw new AppError(400, "Bad Request", "Post is already favorited");
    }

    const newFavorite = {
      user_id,
      post_id,
    };

    const created = await Favorite.create(newFavorite);
    sendResponse(
      res,
      201,
      true,
      { data: created },
      null,
      "Successfully Created Favorite"
    );
  } catch (err) {
    next(err);
  }
};

//Get All Favorites for a User
favoriteController.getFavoriteUserId = async (req, res, next) => {
  const user_id = req.params.user_id;
  const filter = { user_id, isDeleted: false };

  try {
    if (!user_id) {
      throw new AppError(400, "Bad Request", "User ID is required");
    }

    const favorites = await Favorite.find(filter)
      .populate("post_id")
      .populate("user_id", "name email");

    sendResponse(
      res,
      200,
      true,
      { data: favorites },
      null,
      "Successfully found list of Favorites"
    );
  } catch (err) {
    next(err);
  }
};

//Delete Favorite
favoriteController.deleteFavorite = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "Favorite ID is required");

    const updated = await Favorite.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    );

    if (!updated) {
      throw new AppError(404, "Not Found", "Favorite not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Successfully deleted Favorite"
    );
  } catch (err) {
    next(err);
  }
};

//Delete Favorite by Post ID
favoriteController.deleteFavoriteByPostId = async (req, res, next) => {
  const { post_id } = req.params;
  const user_id = req.userId;
  const options = { new: true };

  try {
    if (!post_id || !user_id) {
      throw new AppError(
        400,
        "Bad Request",
        "Post ID and User ID are required"
      );
    }

    const updated = await Favorite.findOneAndUpdate(
      { post_id, user_id, isDeleted: false },
      { isDeleted: true },
      options
    );

    if (!updated) {
      throw new AppError(404, "Not Found", "Favorite not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Successfully deleted Favorite"
    );
  } catch (err) {
    next(err);
  }
};

//Check if a user has favorited a post
favoriteController.checkFavorite = async (req, res, next) => {
  const { post_id } = req.params;
  const user_id = req.userId;

  try {
    if (!post_id || !user_id) {
      throw new AppError(
        400,
        "Bad Request",
        "Post ID and User ID are required"
      );
    }

    const existingFavorite = await Favorite.findOne({
      user_id,
      post_id,
      isDeleted: false,
    });

    sendResponse(
      res,
      200,
      true,
      { isFavorited: !!existingFavorite },
      null,
      "Successfully checked favorite status"
    );
  } catch (err) {
    next(err);
  }
};

//Get favorite count for a specific post
favoriteController.getFavoriteCount = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    if (!post_id) {
      throw new AppError(400, "Bad Request", "Post ID is required");
    }

    const count = await Favorite.countDocuments({
      post_id,
      isDeleted: false,
    });

    sendResponse(
      res,
      200,
      true,
      { count },
      null,
      "Successfully retrieved favorite count"
    );
  } catch (err) {
    next(err);
  }
};

//Get all users who favorited a specific post
favoriteController.getUsersByPost = async (req, res, next) => {
  const { post_id } = req.params;

  try {
    if (!post_id) {
      throw new AppError(400, "Bad Request", "Post ID is required");
    }

    const favorites = await Favorite.find({
      post_id,
      isDeleted: false,
    }).populate("user_id", "name email avatar");

    const users = favorites.map((favorite) => favorite.user_id);

    sendResponse(
      res,
      200,
      true,
      { users },
      null,
      "Successfully retrieved users who favorited this post"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = favoriteController;
