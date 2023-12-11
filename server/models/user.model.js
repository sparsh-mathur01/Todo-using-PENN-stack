import { uuidv4 } from "../utils/helper_functions/generateUUID.js";
import { pool } from "../db.js";

export const getUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query("select * from users where email = $1", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.log({ error });
  }
};

export const createUser = async ({ name, email, password }) => {
  try {
    const { rows } = pool.query(
      "INSERT INTO users values ($1,$2,$3,$4,$5) returning id",
      [uuidv4(), name, email, password, new Date()]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};
