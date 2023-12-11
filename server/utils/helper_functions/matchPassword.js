import CryptoJs from "crypto-js";

export async function matchPassword(password, cipher) {
  const hash = CryptoJs.AES.encrypt(
    password,
    process.env.PASS_SECRET_KEY
  ).toString();
  return hash === cipher;
}
