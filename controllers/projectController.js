import Project from "../models/projectSchema.js";

export const createProject = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            console.error('Validation Error: Name and description are required');
            return res.status(400).json({ message: "Name and description are required" });
        }

        const existingProject = await Project.findOne({ name });
        if (existingProject) {
            return res.status(400).json({ message: "Project exists" });
        }

        const newProject = new Project({ name, description });
        await newProject.save();
        return res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
       next(error);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
       next(error);
    }
};