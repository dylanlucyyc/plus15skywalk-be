const { sendResponse, AppError } = require("../helpers/utils.js");

const RestaurantCategory = require("../models/RestaurantCategory.js");

const RestaurantCategoryController = {};

//Create Restaurant Category
RestaurantCategoryController.createRestaurantCategory = async (
  req,
  res,
  next
) => {
  const { name, type, icon } = req.body;

  try {
    if (!name || !type) {
      throw new AppError(400, "Bad Request", "Name and type are required");
    }

    const newCategory = {
      name,
      type,
      icon: icon || "",
    };

    const created = await RestaurantCategory.create(newCategory);
    sendResponse(
      res,
      201,
      true,
      { data: created },
      null,
      "Successfully Created Restaurant Category"
    );
  } catch (err) {
    next(err);
  }
};

//Get Restaurant Category
RestaurantCategoryController.getAllRestaurantCategory = async (
  req,
  res,
  next
) => {
  const filter = { isDeleted: false };
  try {
    const listOfFound = await RestaurantCategory.find(filter);
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "Successfully found list of Restaurant Category"
    );
  } catch (err) {
    next(err);
  }
};

//Update Restaurant Category by ID
RestaurantCategoryController.updateRestaurantCategoryById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "Category ID is required");

    const updated = await RestaurantCategory.findByIdAndUpdate(
      id,
      updateInfo,
      options
    );

    if (!updated) {
      throw new AppError(404, "Not Found", "Restaurant Category not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Successfully updated Restaurant Category"
    );
  } catch (err) {
    next(err);
  }
};

//Delete Restaurant Category
RestaurantCategoryController.deleteRestaurantCategoryById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "Category ID is required");

    const updated = await RestaurantCategory.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    );

    if (!updated) {
      throw new AppError(404, "Not Found", "Restaurant Category not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Successfully deleted Restaurant Category"
    );
  } catch (err) {
    next(err);
  }
};

//Get Restaurant Category by ID
RestaurantCategoryController.getRestaurantCategoryById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    if (!id) throw new AppError(400, "Bad Request", "Category ID is required");

    const category = await RestaurantCategory.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!category) {
      throw new AppError(404, "Not Found", "Restaurant Category not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: category },
      null,
      "Successfully found Restaurant Category"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = RestaurantCategoryController;
