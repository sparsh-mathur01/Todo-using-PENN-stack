import express from "express";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

export const router = express.Router();
// create todo
router.post("/create", createTodo);
// get all todos
router.get("/", async (req, res) => await getAllTodos(req, res));
//update a todo
router.put("/:todoId", async (req, res) => await updateTodo(req, res));
//delete a todo
router.delete("/:todoId", async (req, res) => await deleteTodo(req, res));
