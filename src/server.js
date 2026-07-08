import express from "express";
import pool from "./config/db.js"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/api", async (req, res) => {
 res.json({
    message: "STORE SERVER API"
 })
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
}); 