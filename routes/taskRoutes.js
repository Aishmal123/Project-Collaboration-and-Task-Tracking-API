import express from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";

const router =express.Router();
router.post('/Tasks',createTask);
router.get('/Tasks',getTasks);
router.get('/Tasks/:id',getTaskById);
router.put('/Tasks/:id',updateTask);
router.delete('/Tasks/:id',deleteTask);
export default router;