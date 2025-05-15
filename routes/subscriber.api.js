const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriber.controllers.js");

router.post("/", subscriberController.create);

module.exports = router;
