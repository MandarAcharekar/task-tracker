import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        dueDate: { type: Date },
        status: { type: String, enum: ['open', 'completed'], default: 'open' },
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        assignedTo: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
    }, 
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
