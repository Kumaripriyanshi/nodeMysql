import express from "express";
import {
  viewAllcars,
  viewAllDeals,
  viewCarswithDealership,
  addnewVehicles,
} from "../controllers/carscontroller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/viewAllcars", viewAllcars);
router.post("/cars/:dealId", viewCarswithDealership);
router.post("/addVehiclescars", verifyToken, addnewVehicles);
router.post("/deals/:dealId", viewAllDeals);

export default router;
