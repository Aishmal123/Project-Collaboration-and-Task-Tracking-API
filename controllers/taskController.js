import task from "../models/taskSchema.js";
export const createTask = async(req,res,next)=>{
       try{
              const newTask=await task.create(req.body);
              return res.status(201).json({message :'Task created successfully', task: newTask});
       }
       catch(error){
              next(error);
       };
}
export  const getTasks = async (req, res) => {
  const { projectId, status, priority } = req.query;

  let filter = {};
  if (projectId) filter.projectId = projectId;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await task.find(filter);
  res.json(tasks);
};

export  const getTaskById = async (req, res) => {
  const foundTask = await task.findById(req.params.id);
  res.json(foundTask);
};

export  const updateTask = async (req, res) => {
  const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

export  const deleteTask = async (req, res) => {
  await task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};