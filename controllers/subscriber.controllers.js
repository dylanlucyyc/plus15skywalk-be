const { sendResponse, AppError } = require("../helpers/utils.js");
const Subscriber = require("../models/Subscriber.js");

const subscriberController = {};

//Create a new subscriber
subscriberController.create = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new AppError(400, "Email is required", "Bad Request");
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      throw new AppError(400, "Email already exists", "Bad Request");
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    sendResponse(
      res,
      201,
      true,
      newSubscriber,
      null,
      "Subscriber created successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = subscriberController;
