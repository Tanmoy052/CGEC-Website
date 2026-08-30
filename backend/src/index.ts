import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";
import { seedDefaultAdmin } from "./controllers/authController";
import { runFullWebsiteSeeder } from "./lib/seedAllData";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("CGEC Website API is running...");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // Automatically initialize default admin and seed all existing data
  await seedDefaultAdmin();
  await runFullWebsiteSeeder();
});
