import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
const bodyParser = require('body-parser')

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["POST", "GET", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((error) => console.log("DB connection error:", error));

