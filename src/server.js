import express from "express";
// import pool from "./config/db.js"
import admin from "./routes/adminRoute.js"
import dotenv from "dotenv"
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin',admin);

app.get("/api", async (req, res) => {
 res.json({
    message: "STORE SERVER API conected"
 })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 