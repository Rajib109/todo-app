import Todo from "../models/Todo.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// GET all todos with pagination, sorting, search
export const getTodos = asyncHandler(async (req, res) => {
  let {
    page = 1,
    limit = 10,
    sort = "createdAt",
    order = "desc",
    search = "",
  } = req.query;

  page = Math.max(1, parseInt(page));
  limit = Math.max(1, parseInt(limit));
  const skip = (page - 1) * limit;

  // Allowed sorting fields
  const allowedSortFields = ["text", "createdAt", "updatedAt"];
  if (!allowedSortFields.includes(sort)) sort = "createdAt";

  // Sorting order
  const sortOrder = order === "asc" ? 1 : -1;

  // Search filter (case-insensitive)
  // Search + completed filter
  const filter = {};

  // Search by text
  if (search) {
    filter.text = { $regex: search, $options: "i" };
  }

  // Completed filter (true/false)
  if (req.query.completed !== undefined) {
    filter.completed = req.query.completed === "true";
  }

  // Get total count (for pagination UI)
  const total = await Todo.countDocuments(filter);

  // Fetch todos with filters
  const todos = await Todo.find(filter)
    .sort({ [sort]: sortOrder })
    .skip(skip)
    .limit(limit);

  return successResponse(
    res,
    {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
      todos,
    },
    "Fetched todos with filters"
  );
});

// POST create todo
export const createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    res.status(400);
    throw new Error("Todo text is required");
  }

  const newTodo = new Todo({ text });
  const savedTodo = await newTodo.save();

  return successResponse(res, savedTodo, "Todo created", 201);
});

// PUT update todo
export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  todo.text = req.body.text ?? todo.text;
  todo.completed =
    req.body.completed !== undefined ? req.body.completed : todo.completed;

  const updatedTodo = await todo.save();
  return successResponse(res, updatedTodo, "Todo updated");
});

// DELETE todo
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  await todo.deleteOne();
  return successResponse(res, null, "Todo deleted");
});
