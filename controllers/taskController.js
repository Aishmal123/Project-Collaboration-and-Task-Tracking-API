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
try{
  
  let filter = {};
  if (projectId) filter.projectId = projectId;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await task.find(filter);
  res.json(tasks);
}
catch(error){
  next(error);
}
};

export  const getTaskById = async (req, res) => {
  try{
    const foundTask = await task.findById(req.params.id);
  res.json(foundTask);
  if(!foundTask){
   return  res.status(404).json({message: "task not Found"});
  }
  }
  catch(error){
    next(error);
  }
};

export  const updateTask = async (req, res) => {
  try{
  const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
if(!updatedTask){
  return res.status(404).json({message: "Task not Found"});
}
  }
  catch(error){
    next(error);
  }
};

export  const deleteTask = async (req, res) => {
try{
  const {id} = req.params;
    const deletedTask = await task.findByIdAndDelete(req.params.id);
    if (!deletedTask){
    return res.status(404).json({message: "Task not Found"});
  };
  res.json({ message: "Task deleted" });
}
catch(error){
  next(error);
}
};