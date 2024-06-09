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

router.get("/", async (req, res) => {
  try {
    const connection = await initDatabase();
    await connection.connect();

    const getData = await connection.query(
      "SELECT * FROM user ORDER BY id DESC"
    );
    console.log(getData[0]);
    await connection.end();
    res.send(getData[0]);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await initDatabase();
    await connection.connect();

    console.log(req);

    await connection.query(`DELETE FROM user WHERE id = ${id}`);
    await connection.end();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
