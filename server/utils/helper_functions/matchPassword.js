import CryptoJs from "crypto-js";

export async function matchPassword(password, cipher) {
  const originalPassword = CryptoJs.AES.decrypt(
    cipher,
    process.env.PASS_SECRET_KEY
  ).toString(CryptoJs.enc.Utf8);
  return password === originalPassword;
}
