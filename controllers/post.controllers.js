const { sendResponse, AppError } = require("../helpers/utils.js");

const Post = require("../models/Post.js");

const postController = {};

//Create Post
postController.createPost = async (req, res, next) => {
  const {
    post_type,
    content,
    title,
    image,
    tags,
    category,
    event_details,
    restaurant_details,
    slug,
  } = req.body;
  const posted_by = req.userId; // Assuming userId is set in the auth middleware

  try {
    if (!post_type || !posted_by) {
      throw new AppError(
        400,
        "Bad Request",
        "Post type and user ID are required"
      );
    }

    const newPost = {
      post_type,
      posted_by,
      slug,
      title,
      content: content || "",
      image: image || "",
      tags: tags || [],
      category,
      event_details: post_type === "event" ? event_details : undefined,
      restaurant_details:
        post_type === "restaurant" ? restaurant_details : undefined,
    };

    const created = await Post.create(newPost);
    sendResponse(res, 201, true, created, null, "Successfully Created Post");
  } catch (err) {
    next(err);
  }
};

//Get All Posts
postController.getAllPosts = async (req, res, next) => {
  const filter = { isDeleted: false };
  const { post_type, category } = req.query;

  try {
    if (post_type) filter.post_type = post_type;
    if (category) filter.category = category;

    const posts = await Post.find(filter)
      .populate("posted_by", "name email")
      .populate("category")
      .populate("restaurant_details.category");

    sendResponse(
      res,
      200,
      true,
      posts,
      null,
      "Successfully found list of Posts"
    );
  } catch (err) {
    next(err);
  }
};

//Get Post by ID
postController.getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) throw new AppError(400, "Bad Request", "Post ID is required");

    const post = await Post.findOne({ _id: id, isDeleted: false })
      .populate("posted_by", "name email")
      .populate("category")
      .populate("restaurant_details.category");

    if (!post) {
      throw new AppError(404, "Not Found", "Post not found");
    }

    sendResponse(
      res,
      200,
      true,
      { data: post },
      null,
      "Successfully found Post"
    );
  } catch (err) {
    next(err);
  }
};

//Update Post
postController.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "Post ID is required");

    const updated = await Post.findByIdAndUpdate(id, updateInfo, options)
      .populate("posted_by", "name email")
      .populate("category")
      .populate("restaurant_details.category");

    if (!updated) {
      throw new AppError(404, "Not Found", "Post not found");
    }

    sendResponse(res, 200, true, updated, null, "Successfully updated Post");
  } catch (err) {
    next(err);
  }
};

//Delete Post
postController.deletePost = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };

  try {
    if (!id) throw new AppError(400, "Bad Request", "Post ID is required");

    const updated = await Post.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    );

    if (!updated) {
      throw new AppError(404, "Not Found", "Post not found");
    }

    sendResponse(res, 200, true, updated, null, "Successfully deleted Post");
  } catch (err) {
    next(err);
  }
};

module.exports = postController;
