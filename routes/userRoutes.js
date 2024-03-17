import express from "express";
import {
  dealsWithcarId,
  viewAllvehiclesByuserId,
  viewllDealswithcarId,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/dealerships/:carId", dealsWithcarId);
router.get("/vehicles", verifyToken, viewAllvehiclesByuserId);
router.get("/deals/:carId", viewllDealswithcarId);

export default router;
