import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectsRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Project-Collaboration-and-Task-Tracking-API");
});

// Error handler
app.use(errorHandler);

export default app;
