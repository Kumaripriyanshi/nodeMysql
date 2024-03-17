// routes/userRoutes.js
import express from "express";
import db from "../db/db.js"; // Your database connection

const router = express.Router();

// Endpoint to view dealerships with a certain car
const dealsWithcarId = async (req, res) => {
  const { carId } = req.params;
  try {
    const dealerships = await db.query(
      "SELECT d.* FROM dealership d JOIN cars c ON d.dealership_id = c.dealership_id WHERE c.car_id = ?",
      [carId]
    );
    res.status(200).json(dealerships);
  } catch (error) {
    console.error("Error fetching dealerships with a certain car:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to view all vehicles owned by user along with dealer info
const viewAllvehiclesByuserId = async (req, res) => {
  const userId = req.user.user_id; // Assuming user_id is available in the JWT payload
  try {
    const vehicles = await db.query(
      "SELECT v.*, d.dealership_name, d.dealership_location FROM sold_vehicles v JOIN dealership d ON v.dealership_id = d.dealership_id WHERE v.user_id = ?",
      [userId]
    );
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles owned by user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to view all deals on a certain car
const viewllDealswithcarId = async (req, res) => {
  const { carId } = req.params;
  try {
    const deals = await db.query("SELECT * FROM deal WHERE car_id = ?", [
      carId,
    ]);
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals on a certain car:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { dealsWithcarId, viewAllvehiclesByuserId, viewllDealswithcarId };
