import Todo from "../models/Todo.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// GET all todos
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  return successResponse(res, todos, "Fetched todos");
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
