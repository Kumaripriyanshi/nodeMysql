// routes/dealershipRoutes.js
import express from "express";
import db from "../db/db.js"; // Your database connection
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

// Endpoint to add cars to dealership
const addCars = async (req, res) => {
  const { car_id, type, name, model, car_info } = req.body;
  const dealershipId = req.user.dealership_id; // Assuming dealership_id is available in the JWT payload
  try {
    // Insert new car into the database
    await db.query(
      "INSERT INTO cars (car_id, type, name, model, car_info, dealership_id) VALUES (?, ?, ?, ?, ?, ?)",
      [car_id, type, name, model, JSON.stringify(car_info), dealershipId]
    );

    res.status(201).json({ message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car to dealership:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to add deals to dealership
const addDeals = async (req, res) => {
  const { deal_id, car_id, deal_info } = req.body;
  const dealershipId = req.user.dealership_id; // Assuming dealership_id is available in the JWT payload
  try {
    // Insert new deal into the database
    await db.query(
      "INSERT INTO deal (deal_id, car_id, deal_info, dealership_id) VALUES (?, ?, ?, ?)",
      [deal_id, car_id, JSON.stringify(deal_info), dealershipId]
    );

    res.status(201).json({ message: "Deal added successfully" });
  } catch (error) {
    console.error("Error adding deal to dealership:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to view all vehicles dealership has sold along with owner info
const viewAllvehicles = async (req, res) => {
  const dealershipId = req.user.dealership_id; // Assuming dealership_id is available in the JWT payload
  try {
    const vehicles = await db.query(
      "SELECT v.*, u.user_email, u.user_location FROM sold_vehicles v JOIN user u ON v.user_id = u.user_id WHERE v.dealership_id = ?",
      [dealershipId]
    );
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles dealership has sold:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addCars, addDeals, viewAllvehicles };
