import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dealerRoutes from "./routes/dealerRoutes.js";
const app = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/user", userRoutes);
app.use("/api/deals", dealerRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
