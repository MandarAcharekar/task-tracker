import Task from '../models/task.model.js'

export const createTask = async (req, res) => {
    const { title, description, dueDate, assignedTo, teamId } = req.body;
    
    try{
        const team = await Team.findById(teamId);
        if(!team){
            return res.status(404).json({ message: `Team not found` });
        }

        // Ensure the assigned user is part of the team
        if(!team.members.includes(assignedTo)) {
            return res.status(400).json({ message: `Assigned user is not a member of the team` });
        }

        const task = new Task({
            title,
            description,
            dueDate,
            createdBy: req.user.userId,
            assignedTo: assignedTo || req.user.userId,
            teamId
        });
        await task.save();

        res.status(201).json({ task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const getTasks = async (req, res) => {
    const { status, assignedTo, search, sortBy } = req.query;

    try{
        const query = {};

        if(assignedTo){
            query.assignedTo = assignedTo;
        }else{
            query.assignedTo = req.user.userId;
        }

        if(status){
            query.status = status;
        }

        if(search){
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const sortOptions = {};
        if (sortBy === 'dueDate') sortOptions.dueDate = 1; // Sort by due date (ascending)
        else if (sortBy === 'createdAt') sortOptions.createdAt = -1; // Sort by creation date (descending)

        const tasks = await Task.find(query).sort(sortOptions);

        res.status(200).json({ tasks });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const getTaskById = async (req, res) => {
    const { taskId } = req.params;

    try{
        const task = await Task.findById(taskId);
        if (!task){
            return res.status(404).json({ message: `Task not found` });
        }   

        res.status(200).json({ task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, dueDate, status } = req.body;

    try{
        const task = await Task.findById(taskId);
        if (!task){
            return res.status(404).json({ message: `Task not found` });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: `Task updated`, task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    
    try{
        const task = await Task.findById(taskId);
        if (!task){
            return res.status(404).json({ message: `Task not found` });
        }

        await task.remove();
        
        res.status(200).json({ message: `Task deleted` });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const addComment = async (req, res) => {
    const { taskId } = req.params;
    const { text } = req.body;

    try{
        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({ message: `Task not found` });
        }

        task.comments.push({
            text,
            createdBy: req.user.userId,
        });

        await task.save();

        res.status(200).json({ message: `Comment added successfully`, task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const addAttachment = async (req, res) => {
    const { taskId } = req.params;
    const { filename, fileUrl } = req.body;

    try {
        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({ message: `Task not found` });
        }

        task.attachments.push({
            filename,
            fileUrl,
            uploadedBy: req.user.userId,
        });

        await task.save();

        res.status(200).json({ message: `Attachment added successfully`, task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};