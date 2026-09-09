import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";
import { seedDefaultAdmin } from "./controllers/authController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Robust CORS configuration supporting production, preview deployments, and local dev
const explicitOrigins = [
  'https://cgec-website-frontend.vercel.app',
  'https://cgec.org.in',
  'https://www.cgec.org.in',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

if (process.env.FRONTEND_URL) {
  explicitOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ''));
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server, Render health checks)
    if (!origin) {
      return callback(null, true);
    }
    const isAllowed =
      explicitOrigins.includes(origin) ||
      /^https:\/\/[a-zA-Z0-9-]+-.*\.vercel\.app$/.test(origin) ||
      /^https:\/\/.*cgec.*\.vercel\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      // Return false without crashing Express with an unhandled exception
      callback(null, false);
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api", publicRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("CGEC Website API is running...");
});

// Global Express error handler
app.use((err: any, req: Request, res: Response, _next: any) => {
  console.error("Express unhandled error:", err?.message || err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
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

  // Automatically initialize default admin if not present
  await seedDefaultAdmin();
});

