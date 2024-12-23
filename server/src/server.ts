/// <reference types="node" />
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors"; // Import CORS middleware

import db from "./config/connection.js";
import routes from "./routes/index.js";

// Cross-platform solution for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await db();

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS for the frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});

