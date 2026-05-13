import task from "../models/taskSchema.js";
export const createTask = async(req,res,next)=>{
       try{
              const {title ,description,priority,dueDate,completed}=req.body;
              const task =new Task({
                title,description,priority,dueDate,completed:completed ==='yes'|| completed===true,owner:req.user.id
              });
              const saved =await task.save(); 
              return res.status(201).json({message :'Task created successfully', task: newTask});
              if(!projectId || !title){
                return res.status(400).json({message:"Project ID and title are required"});
              }
       }
       catch(error){
              next(error);
       };
} 
export  const getTasks = async (req, res,next) => {
  const { projectId, status, priority, page = 1 , limit=5 } = req.query;
try{
  const tasks= await Task.find({owner:req.user,id}).sort({createdAt :-1});
  res.json({success:false,message:error})
  // let filter = {};
  // if (projectId) filter.projectId = projectId;
  // if (status) filter.status = status;
  // if (priority) filter.priority = priority;

  // const tasks = await task.find(filter)
  //  .skip((page - 1) * limit)
  //     .limit(Number(limit));
  // res.json(tasks);
}
catch(error){
  next(error);
}
};

export  const getTaskById = async (req, res,next) => {
  try{
    const Task = await task.findById(req.user.id);
    if(!Task){
      return  res.status(404).json({message: "task not Found"});
    }
    res.json(foundTask);
  }
  catch(error){
    next(error);
  }
};

export  const updateTask = async (req, res,next) => {
  try{
    const data={...req.body};
    if(data.completed !== undefined){
      data.completed=data.completed === 'yes' ||data.completed=== true 
    }
  const updatedTask = await task.findByIdAndUpdate({id: req.params.id, owner :  res.user.id},data,{new:true ,runValidators:true});
  
  if(!updatedTask){
    return res.status(404).json({message: "Task not Found"});
  }
  res.json(updatedTask); 
  }
  catch(error){
    next(error);
  }
};

export  const deleteTask = async (req, res,next) => {
try{
  const {id} = req.params;
    const deletedTask = await task.findByIdAndDelete({_id: req.params.id,owner : req.user.id});
    if (!deletedTask){
    return res.status(404).json({message: "Task not Found"});
  };
  res.json({ message: "Task deleted" });
}
catch(error){
  next(error);
}
};