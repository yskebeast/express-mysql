import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import rootRoutes from "./routes/root.mjs";
import listRoutes from "./routes/list.mjs";

const PORT = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "http://localhost:3000",
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

createTableQuery();

// * root directory
app.use("/", rootRoutes);

// * list directory
app.use("/list", listRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
