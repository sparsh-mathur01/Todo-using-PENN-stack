import { pool } from "../db.js";
import {
  archiveTodoInDB,
  createTodoInDB,
  fetchAllTodos,
  updateTodoInDB,
} from "../models/todo.model.js";

const getAllTodos = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.userId;
    const rows = await fetchAllTodos({ userId, status });
    return res.status(200).send({ totalCount: rows.length, data: rows });
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ error });
  }
};

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.userId;
    const data = await createTodoInDB({ userId, description });
    res.status(201).send({ data });
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description: new_description, status: new_status } = req.body;
    const data = await updateTodoInDB({ new_status, new_description, todoId });
    res.status(200).send({ data });
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const data = await archiveTodoInDB({ todoId });
    res.status(200).send({ data });
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };
