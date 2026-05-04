import express from 'express';
import projectRoutes from './routes/projectsRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorMiddleware.js'
const app = express();
app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('Project-Collaboration-and-Task-Tracking-API');
});
app.use(errorHandler);
export default app;

