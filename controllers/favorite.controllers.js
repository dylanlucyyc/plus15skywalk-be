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
favoriteController.getAllFavorites = async (req, res, next) => {
  const user_id = req.userId;
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

//Get Favorite by ID
favoriteController.getFavoriteById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) throw new AppError(400, "Bad Request", "Favorite ID is required");

    const favorite = await Favorite.findOne({ _id: id, isDeleted: false })
      .populate("post_id")
      .populate("user_id", "name email");

    if (!favorite) {
      throw new AppError(404, "Not Found", "Favorite not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: favorite },
      null,
      "Successfully found Favorite"
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

module.exports = favoriteController;
