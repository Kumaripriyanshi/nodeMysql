// routes/authRoutes.js
import express from "express";
import { registerAdmin, registerUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/register/user", registerUser);

// router.post("/register/user", authController.registerUser);
// router.post("/register/dealership", authController.registerDealership);

// router.post("/login/admin", authController.loginAdmin);
// router.post("/login/user", authController.loginUser);
// router.post("/login/dealership", authController.loginDealership);

// router.post("/logout", authController.logout);
// router.post("/changePassword", authController.changePassword);

export default router;
