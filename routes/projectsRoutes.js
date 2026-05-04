import express from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';
const router = express.Router();
router.post('/projects', createProject);
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
export default router;