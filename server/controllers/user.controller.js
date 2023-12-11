import { createUser, getUserByEmail } from "../models/user.model.js";
import { matchPassword } from "../utils/helper_functions/matchPassword.js";
import { createJWTToken } from "../utils/helper_functions/createJWTToken.js";
import { encryptPassword } from "../helpers/crypto.helper.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      if (matchPassword(password, user.password)) {
        return res
          .status(200)
          .json({ token: createJWTToken(user), id: user.id, name: user.name });
      }
      return res.status(401).send("wrong password");
    }
    return res.status(400).send("user not found");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const data = await createUser({
        name,
        email,
        password: encryptPassword(password),
      });
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send({ message: "Required fields are name,email,password" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};
``;
