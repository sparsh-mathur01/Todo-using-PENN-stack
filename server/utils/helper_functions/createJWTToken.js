import jwt from "jsonwebtoken";

export const createJWTToken = (user) =>
  jwt.sign({ time: Date(), userId: user?.id }, process.env.JWT_SECRET_KEY);
