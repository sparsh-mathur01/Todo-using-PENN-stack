import { pool } from "../db.js";
import { getUserByEmail } from "../models/userModels.js";
import { uuidv4 } from "../utils/helper_functions/generateUUID.js";
import CryptoJs from "crypto-js";
import { matchPassword } from "../utils/helper_functions/matchPassword.js";
import { createJWTToken } from "../utils/helper_functions/createJWTToken.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(pool, email);
    if (user) {
      if (matchPassword(password, user.password)) {
        res.status(200).json({ token: createJWTToken(user), id: user.id });
      } else res.status(401).send("wrong password");
    } else res.status(400).send("user not found");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = CryptoJs.AES.encrypt(
      password,
      process.env.PASS_SECRET_KEY
    ).toString();

    const { rows } = await pool.query(
      "INSERT INTO users values ($1,$2,$3,$4,$5) returning id",
      [uuidv4(), name, email, hash, new Date()]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
