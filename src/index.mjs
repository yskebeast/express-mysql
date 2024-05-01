import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;
const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL: ", error);
    return;
  }

  console.log("Success connecting to MySQL");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
