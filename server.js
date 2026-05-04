import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import app from './app.js';

dotenv.config();

connectDB();

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
