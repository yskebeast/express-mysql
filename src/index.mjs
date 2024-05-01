import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;
const app = express();

const getMysqlDataQuery = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  try {
    await connection.connect();
    console.log("Success connecting to MySQL");

    const [results, fields] = await connection.query(`SELECT * FROM ${process.env.MYSQL_DATABASE}`);
    console.log(results, fields);
  } catch (err) {
    console.log(err);
  }
};

getMysqlDataQuery();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
