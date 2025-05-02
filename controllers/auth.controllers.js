const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {};

authController.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new AppError(400, "Bad Request", "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new AppError(401, "Unauthorized", "Invalid email or password");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError(401, "Unauthorized", "Invalid email or password");
    }

    // Create token with 1 day expiry
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Remove password from response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password_hash;

    sendResponse(
      res,
      200,
      true,
      {
        data: {
          user: userWithoutPassword,
          token,
          expiresIn: "1d", // Tell client when token expires
        },
      },
      null,
      "Successfully logged in"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
