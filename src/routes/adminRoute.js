import express from 'express';
import AdminController from "../controller/adminController.js";

const router = express.Router();

const adminController = new AdminController();

// admin auth
router.post("/register", adminController.registerAdmin.bind(adminController));
router.post("/login", adminController.login.bind(adminController));

export default router;