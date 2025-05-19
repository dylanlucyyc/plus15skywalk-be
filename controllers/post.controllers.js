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
      event_details: post_type === "events" ? event_details : undefined,
      restaurant_details:
        post_type === "restaurants" ? restaurant_details : undefined,
    };

    const created = await Post.create(newPost);
    sendResponse(res, 201, true, created, null, "Successfully Created Post");
  } catch (err) {
    next(err);
  }
};

//Get All Posts
postController.getAllPosts = async (req, res, next) => {
  try {
    const filter = { isDeleted: false };
    const {
      post_type,
      page = 1,
      per_page = 10,
      filter: filterType = "all",
      sort = "newest",
      search,
    } = req.query;

    // Apply filters
    if (post_type) filter.post_type = post_type;
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Pagination setup
    const perPage = parseInt(per_page);
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * perPage;

    // Sort configuration
    let sortOption = {};
    if (sort === "newest") {
      sortOption = { created_at: -1 };
    } else if (sort === "oldest") {
      sortOption = { created_at: 1 };
    } else if (sort === "a-z") {
      sortOption = { title: 1 };
    } else if (sort === "z-a") {
      sortOption = { title: -1 };
    }

    // Get total count for pagination metadata
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = totalPosts > 0 ? Math.ceil(totalPosts / perPage) : 0;

    // Ensure current page doesn't exceed total pages
    const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
    const validSkip = (validCurrentPage - 1) * perPage;

    // Get posts with pagination and sorting
    const posts = await Post.find(filter)
      .sort(sortOption)
      .skip(validSkip)
      .limit(perPage)
      .populate("posted_by", "name email");

    sendResponse(
      res,
      200,
      true,
      {
        postType: post_type,
        posts,
        currentPage: validCurrentPage,
        totalPages,
        perPage: Number(perPage),
        totalPosts,
      },
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

    const post = await Post.findOne({ _id: id, isDeleted: false }).populate(
      "posted_by",
      "name email"
    );

    if (!post) {
      throw new AppError(404, "Not Found", "Post not found");
    }

    sendResponse(res, 200, true, post, null, "Successfully found Post");
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

    const updated = await Post.findByIdAndUpdate(
      id,
      updateInfo,
      options
    ).populate("posted_by", "name email");

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

//Get Post by Slug
postController.getPostBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    if (!slug) throw new AppError(400, "Bad Request", "Slug is required");

    const post = await Post.findOne({ slug, isDeleted: false }).populate(
      "posted_by",
      "name email"
    );

    if (!post) {
      throw new AppError(404, "Not Found", "Post not found");
    }

    // Find 2 relevant posts of the same post_type
    const relevantPosts = await Post.find({
      post_type: post.post_type,
      _id: { $ne: post._id }, // Exclude the current post
      isDeleted: false,
    })
      .sort({ createdAt: -1 }) // Get the most recent ones
      .limit(3)
      .populate("posted_by", "name email");

    sendResponse(
      res,
      200,
      true,
      { post, relevantPosts },
      null,
      "Successfully found Post with relevant suggestions"
    );
  } catch (err) {
    next(err);
  }
};

//Get Post by User
postController.getPostByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!userId) throw new AppError(400, "Bad Request", "User ID is required");

    const posts = await Post.find({
      posted_by: userId,
      isDeleted: false,
    }).populate("posted_by", "name email");

    sendResponse(res, 200, true, posts, null, "Successfully found Posts");
  } catch (err) {
    next(err);
  }
};

module.exports = postController;
