import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }, 
    { timestamps: true }
);

const attachmentSchema = new mongoose.Schema(
    {
        filename: { type: String, required: true },
        fileUrl: { type: String, required: true },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }, 
    { timestamps: true }
);

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
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        comments: [commentSchema],
        attachments: [attachmentSchema],
    }, 
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
