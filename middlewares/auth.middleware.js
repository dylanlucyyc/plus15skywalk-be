const { AppError } = require("../helpers/utils.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const authMiddleware = {};

authMiddleware.loginRequired = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;

    if (!tokenString) {
      throw new AppError(401, "Login Required", "Please login first");
    }

    const token = tokenString.replace("Bearer ", "");
    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey, async (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token Expired", "Please login again");
        } else {
          throw new AppError(401, "Token Error", "Token is invalid");
        }
      }

      const userId = payload._id;
      const user = await User.findById(userId);

      if (!user) {
        throw new AppError(401, "User Not Found", "User no longer exists");
      }

      req.userId = userId;
      req.currentUser = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
