// controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../db/db.js"; // Your database connection
// import { generateToken, verifyToken } from "../middlewares/auth";

const registerAdmin = async (req, res) => {
  const { admin_id, password } = req.body;
  try {
    // Check if admin_id already exists
    const adminExists = await db.query(
      "SELECT * FROM admin WHERE admin_id = ?",
      [admin_id]
    );
    if (adminExists.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new admin into the database
    await db.query(
      "INSERT INTO admin (admin_id, password_hash) VALUES (?, ?)",
      [admin_id, hashedPassword]
    );

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  const { user_email, user_id, user_location, user_info, password } = req.body;
  try {
    // Check if user_email already exists
    const userExists = await db.query(
      "SELECT * FROM user WHERE user_email = ?",
      [user_email]
    );
    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into the database
    await db.query(
      "INSERT INTO user (user_email, user_id, user_location, user_info, password_hash) VALUES (?, ?, ?, ?, ?)",
      [
        user_email,
        user_id,
        user_location,
        JSON.stringify(user_info),
        hashedPassword,
      ]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const registerDealership = async (req, res) => {
  const {
    dealership_email,
    dealership_name,
    dealership_location,
    password,
    dealership_info,
  } = req.body;
  try {
    // Check if dealership_email already exists
    const dealershipExists = await db.query(
      "SELECT * FROM dealership WHERE dealership_email = ?",
      [dealership_email]
    );
    if (dealershipExists.length > 0) {
      return res.status(400).json({ message: "Dealership already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new dealership into the database
    await db.query(
      "INSERT INTO dealership (dealership_email, dealership_name, dealership_location, password_hash, dealership_info) VALUES (?, ?, ?, ?, ?)",
      [
        dealership_email,
        dealership_name,
        dealership_location,
        hashedPassword,
        JSON.stringify(dealership_info),
      ]
    );

    res.status(201).json({ message: "Dealership registered successfully" });
  } catch (error) {
    console.error("Error registering dealership:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  const { admin_id, password } = req.body;
  try {
    // Fetch admin details from database
    const admin = await db.query("SELECT * FROM admin WHERE admin_id = ?", [
      admin_id,
    ]);
    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      admin[0].password_hash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken({ admin_id: admin[0].admin_id });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { user_email, password } = req.body;
  try {
    // Fetch user details from database
    const user = await db.query("SELECT * FROM user WHERE user_email = ?", [
      user_email,
    ]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].password_hash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken({ user_id: user[0].user_id });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  // Logout logic (e.g., invalidate token)
  // Since JWT is stateless, client-side logout can be achieved by deleting the token from the client
  // You may want to implement token blacklist or token invalidation logic on the server side
  res.status(200).json({ message: "Logged out successfully" });
};

const changePassword = async (req, res) => {
  const { admin_id, old_password, new_password } = req.body;
  try {
    // Fetch admin details from database
    const admin = await db.query("SELECT * FROM admin WHERE admin_id = ?", [
      admin_id,
    ]);
    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare old password
    const isOldPasswordValid = await bcrypt.compare(
      old_password,
      admin[0].password_hash
    );
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(new_password, saltRounds);

    // Update password in the database
    await db.query("UPDATE admin SET password_hash = ? WHERE admin_id = ?", [
      hashedNewPassword,
      admin_id,
    ]);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  registerAdmin,
  registerUser,
  registerDealership,
  changePassword,
  loginUser,
  loginAdmin,
};
