import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String 
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    dueDate: {
        type: Date
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'user',required:true

    },
    completed:{
type:Boolean,
 default:true
    },
    page: {
        type: Number,
        default:1
    },
    limit: {
        type:Number,
        default:5
    }
});

export default mongoose.model("Task", taskSchema);