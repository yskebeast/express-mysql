import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { randomPrefecture } from "./util/prefectures.mjs";
import { randomAge } from "./util/prefectures.mjs";

const PORT = 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const initDatabase = async () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
};

const createTableQuery = async () => {
  try {
    const connection = await initDatabase();
    await connection.connect();
    console.log("Success connecting to MySQL");
    await connection.end();
  } catch (err) {
    console.log(err);
  }
};

const addData = async () => {
  try {
    const connection = await initDatabase();
    await connection.connect();

    const pref = await randomPrefecture();
    const age = await randomAge();

    await connection.query(
      `INSERT INTO user (name, pref, age) VALUES ('長谷川三郎', '${pref}', ${age})`
    );

    const getTableData = await connection.query("select * from user");
    console.log(getTableData[0]);

    return getTableData[0];
  } catch (err) {
    console.log(err);
  }
};

createTableQuery();

app.get("/", async (req, res) => {
  try {
    const data = await addData();
    console.log(data);
    const connection = await initDatabase();
    await connection.end();
    res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/saburo", async (req, res) => {
  try {
    const connection = await initDatabase();
    await connection.connect();

    const getSaburoData = await connection.query(
      "SELECT * FROM user WHERE name = '長谷川三郎' ORDER BY age ASC"
    );
    console.log(getSaburoData[0]);
    await connection.end();
    res.send(JSON.stringify(getSaburoData[0]));
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
