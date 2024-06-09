import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

const initDatabase = async () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
};

const postData = async ({ name, age, pref }) => {
  try {
    const connection = await initDatabase();
    await connection.connect();
    await connection.query(
      `INSERT INTO user (name, pref, age) VALUES ('${name}', '${pref}', ${age})`
    );
    const getTableData = await connection.query("select * from user");
    console.log(getTableData[0]);
    connection.end();
    return {
      name,
      age,
      pref,
    };
  } catch (err) {
    console.log(err);
  }
};

router.post("/", async (req, res) => {
  const { name, pref, age } = req.body;
  const result = await postData({ name, age, pref });

  res.send(result);
});

export default router;
