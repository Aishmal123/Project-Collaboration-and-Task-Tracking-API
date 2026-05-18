import Task from "../models/taskSchema.js";

export const createTask = async (req, res, next) => {
  console.log("req.user:", req.user);
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      completed,
      status,
    } = req.body;

    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "title are required",
      });
    }

    const task = new Task({
      title,
      description,
      priority,
      status,
      dueDate,
      // projectId,
      completed: completed === true || completed === "true",

      
      owner: req.user.id,
    });

    
    const savedTask = await task.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getTasks = async (req, res, next) => {
  try {
    const {
      // projectId,
      status,
      priority,
      page = 1,
      limit = 5,
    } = req.query;

    let filter = {
      owner: req.user.id,
    };

    // if (projectId) {
    //   filter.projectId = projectId;
    // }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter)
      .populate("projectId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const foundTask = await Task.findById(req.params.id).populate("projectId");

    if (!foundTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task: foundTask,
    });
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (data.completed !== undefined) {
      data.completed = data.completed === true || data.completed === "true";
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
