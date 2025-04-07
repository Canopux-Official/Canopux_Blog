dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import bodyParser from "body-parser";



const app = express();

app.use(cors({
  origin: [process.env.CLIENT_LINK],
  methods: ["POST", "GET", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((error) => console.log("DB connection error:", error));

app.use("/api/blogs", blogRoutes);

// Start server only when not on Vercel
if (process.env.VERCEL !== "true") {
  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
}

// Export app for serverless environments (like Vercel)
export default app;
