import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("CGEC Website API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
