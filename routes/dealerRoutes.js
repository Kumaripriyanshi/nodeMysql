import express from "express";

import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.post("/addcars", verifyToken);
router.post("/addDelas", verifyToken);
router.get("/viewAllvehicles", verifyToken);

export default router;
