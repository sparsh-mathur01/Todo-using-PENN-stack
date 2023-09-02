export const getUserByEmail = async (pool, email) => {
  try {
    const { rows } = await pool.query("select * from users where email = $1", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};
