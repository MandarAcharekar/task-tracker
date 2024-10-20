import Task from '../models/task.model.js'

export const createTask = async (req, res) => {
    const { title, description, dueDate, assignedTo } = req.body;
    
    try{
        const task = new Task({
            title,
            description,
            dueDate,
            createdBy: req.user.userId,
            assignedTo: assignedTo || req.user.userId,
        });
        await task.save();

        res.status(201).json({ task });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({ assignedTo: req.user.userId });

        res.status(200).json({ tasks });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};
