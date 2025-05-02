const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const userController = {};

//Create User
userController.createUser = async (req, res, next) => {
  const { name, email, password, avatar_url } = req.body;

  try {
    if (!name || !email || !password) {
      throw new AppError(
        400,
        "Bad Request",
        "Name, email, and password are required"
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      throw new AppError(400, "Bad Request", "Email already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password_hash,
      avatar_url: avatar_url || "",
    };

    const created = await User.create(newUser);
    // Remove password_hash from response
    const userWithoutPassword = created.toObject();
    delete userWithoutPassword.password_hash;

    sendResponse(
      res,
      201,
      true,
      { data: userWithoutPassword },
      null,
      "Successfully Created User"
    );
  } catch (err) {
    next(err);
  }
};

//Get All Users
userController.getAllUsers = async (req, res, next) => {
  const filter = { isDeleted: false };

  try {
    const users = await User.find(filter).select("-password_hash");

    sendResponse(
      res,
      200,
      true,
      { data: users },
      null,
      "Successfully found list of Users"
    );
  } catch (err) {
    next(err);
  }
};

//Get User by ID
userController.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) throw new AppError(400, "Bad Request", "User ID is required");

    const user = await User.findOne({ _id: id, isDeleted: false }).select(
      "-password_hash"
    );

    if (!user) {
      throw new AppError(404, "Not Found", "User not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: user },
      null,
      "Successfully found User"
    );
  } catch (err) {
    next(err);
  }
};

//Update User
userController.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "User ID is required");

    // If password is being updated, hash it
    if (updateInfo.password) {
      const salt = await bcrypt.genSalt(10);
      updateInfo.password_hash = await bcrypt.hash(updateInfo.password, salt);
      delete updateInfo.password;
    }

    const updated = await User.findByIdAndUpdate(
      id,
      updateInfo,
      options
    ).select("-password_hash");

    if (!updated) {
      throw new AppError(404, "Not Found", "User not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Successfully updated User"
    );
  } catch (err) {
    next(err);
  }
};

//Delete User
userController.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "User ID is required");

    const updated = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    ).select("-password_hash");

    if (!updated) {
      throw new AppError(404, "Not Found", "User not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Successfully deleted User"
    );
  } catch (err) {
    next(err);
  }
};

//Get Current User Profile
userController.getCurrentUser = async (req, res, next) => {
  const userId = req.userId; // Assuming userId is set in the auth middleware

  try {
    if (!userId) throw new AppError(400, "Bad Request", "User ID is required");

    const user = await User.findOne({ _id: userId, isDeleted: false }).select(
      "-password_hash"
    );

    if (!user) {
      throw new AppError(404, "Not Found", "User not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: user },
      null,
      "Successfully found User Profile"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
