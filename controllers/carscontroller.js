// routes/carRoutes.js
import express from "express";
import db from "../db/db.js"; // Your database connection
// import { verifyToken } from "../middlewares/auth";

const router = express.Router();

// Endpoint to view all cars

const viewAllcars = async (req, res) => {
  try {
    const cars = await db.query("SELECT * FROM cars");
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewCarswithDealership = async (req, res) => {
  const { dealId } = req.params;
  try {
    const cars = await db.query("SELECT * FROM cars WHERE dealership_id = ?", [
      dealershipId,
    ]);
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars in dealership:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint to view all cars in a certain dealership

const addnewVehicles = async (req, res) => {
  const { car_id, vehicle_info } = req.body;
  const userId = req.user.user_id; // Assuming user_id is available in the JWT payload
  // You can add similar logic for dealership_id

  try {
    // Insert new vehicle into the database
    await db.query(
      "INSERT INTO sold_vehicles (car_id, vehicle_info) VALUES (?, ?)",
      [car_id, JSON.stringify(vehicle_info)]
    );

    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Endpoint to add new vehicle to the list of owned/sold vehicles at user/dealership end after a deal is complete

// Endpoint to view all deals from a certain dealership

const viewAllDeals = async (req, res) => {
  const { dealId } = req.params;
  try {
    const deals = await db.query("SELECT * FROM deal WHERE dealership_id = ?", [
      dealershipId,
    ]);
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals from dealership:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { viewAllcars, viewCarswithDealership, addnewVehicles, viewAllDeals };
