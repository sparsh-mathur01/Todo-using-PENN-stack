import CryptoJs from "crypto-js";


export const encryptPassword = (password) => {
  return CryptoJs.AES.encrypt(password, process.env.PASS_SECRET_KEY).toString();
};
