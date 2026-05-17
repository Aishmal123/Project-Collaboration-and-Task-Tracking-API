// server.js - use dynamic import to force dotenv first
import dotenv from "dotenv";
dotenv.config();

// Verify it loaded
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

import { connectDB } from "./config/db.js";
import app from "./app.js";

connectDB();
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Running on http://localhost:${port}`));