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

// Restrict CORS to only the Vercel frontend and local dev
const allowedOrigins = [
  'https://cgec-website-frontend.vercel.app',
  'http://localhost:3000',
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Render health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin '${origin}' not allowed`));
    }
  },
  credentials: true,
}));
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

  // Cloudinary env var diagnostic — visible in Render logs
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (cloudName && apiKey && apiSecret) {
    console.log(`✅ Cloudinary configured: cloud_name="${cloudName}"`);
  } else {
    console.error(`❌ Cloudinary NOT configured! Missing env vars:`);
    if (!cloudName) console.error('   - CLOUDINARY_CLOUD_NAME is missing');
    if (!apiKey)   console.error('   - CLOUDINARY_API_KEY is missing');
    if (!apiSecret) console.error('   - CLOUDINARY_API_SECRET is missing');
    console.error('   Image uploads will FAIL until these are set in Render → Environment.');
  }

  // Automatically initialize default admin and seed all existing data
  await seedDefaultAdmin();
  await runFullWebsiteSeeder();
});

