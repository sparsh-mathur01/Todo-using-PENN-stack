import { pool } from "../db.js";
import { uuidv4 } from "../utils/helper_functions/generateUUID.js";

export const getTodoById = async (todo_id) => {
  try {
    const query = `SELECT * FROM todos WHERE todo_id = $1 and archived_at is null`;
    const { rows } = await pool.query(query, [todo_id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const fetchAllTodos = async ({ userId, status }) => {
  try {
    const getAllTodosQuery = `select todo_id, description, created_at, status
    from todos
    where ($1 OR status = $2) and user_id = $3 and archived_at is null
    order by created_at DESC`;
    const { rows } = await pool.query(getAllTodosQuery, [
      !status,
      status,
      userId,
    ]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const createTodoInDB = async ({ userId, description }) => {
  try {
    const { rows } = await pool.query(
      "insert into todos values ($1,$2,$3,$4,$5) returning todo_id",
      [uuidv4(), description, new Date(), "pending", userId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateTodoInDB = async ({
  new_status,
  new_description,
  todoId,
}) => {
  try {
    const updateTodoQuery = `UPDATE todos
    SET
        status = COALESCE($1, status),
        description = COALESCE($2, description)
    WHERE
        todo_id = $3;`;

    const { rows } = await pool.query(updateTodoQuery, [
      new_status,
      new_description,
      todoId,
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const archiveTodoInDB = async ({ todoId }) => {
  try {
    const archiveTodoQuery = `UPDATE todos SET archived_at = $1 WHERE todo_id = $2 returning *`;
    const { rows } = await pool.query(archiveTodoQuery, [new Date(), todoId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
