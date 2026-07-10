import express from 'express';
import Admin from "../controller/adminController.js";

const router = express.Router();

const admin = new Admin();

// admin auth
router.post("/register", admin.registerAdmin.bind(admin));
router.post("/login", admin.login.bind(admin));

export default router;