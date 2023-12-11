import jwt from "jsonwebtoken";

const fetchPayloadFromJWT = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
};

export const vaidate_jwt_token_middleware = async (req, res, next) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      req.userId = fetchPayloadFromJWT(token).userId;
      return next();
    }
    // Access Denied
    return res.status(401).json({ status: "not verified", error });
  } catch (error) {
    // Access Denied
    console.error({ error });
    return res.status(401).json({ error });
  }
};
