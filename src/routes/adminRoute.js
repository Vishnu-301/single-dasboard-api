import express from 'express';
import {Admin} from "../controller/adminController.js";

const router = express.Router();

// admin auth
router.post("/register",Admin.registerAdmin());
router.post("/login",Admin.login());

export default router;