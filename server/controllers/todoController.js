import { pool } from "../db.js";
import { uuidv4 } from "../utils/helper_functions/generateUUID.js";

const getAllTodos = async (_, res) => {
  try {
    const { rows } = await pool.query(
      "select todo_id,description,created_at,status from todos"
    );
    res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const { rows } = await pool.query(
      "insert into todos values ($1,$2,$3,$4) returning *",
      [uuidv4(), description, new Date(), "pending"]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description, status } = req.body;
    const { rows } = await pool.query(
      "UPDATE todos SET description = $2, status= $3 WHERE todo_id = $1 returning *",
      [todoId, description, status]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { rows } = await pool.query("DELETE FROM todos WHERE todo_id = $1 returning *", [
      todoId,
    ]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };
