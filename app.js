import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectsRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { app } from './server.js';

app.use('/project', projectRoutes);
app.use('/task', taskRoutes);
app.get('/', (req, res) => {
  res.send('Hello World');
});

connectDB();

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
