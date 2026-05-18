import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import app from "./app.js";

connectDB();
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Running on http://localhost:${port}`));