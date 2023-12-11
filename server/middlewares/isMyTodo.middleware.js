import { getTodoById } from "../models/todo.model.js";

export const isMyTodoMiddleware = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await getTodoById(todoId);
    if (todo) {
      if (todo.user_id === req.userId) return next();

      return res
        .status(301)
        .send({ message: "Unauthorized! Its not your todo..." });
    }
    return res
      .status(400)
      .send({ message: `No todo found with id = ${todoId}` });
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ error, message: "server error" });
  }
};
